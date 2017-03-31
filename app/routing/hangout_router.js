import express from 'express';
import mongoose from 'mongoose';
import User from '../models/user';
import Hangout from '../models/hangout';
import getEvent from './yelp_data';
import convertValueArrayAndCategoriesToObject from './convert_to_object';
import randomizeSelection from './randomize';
import parseJSON from './parse_json';
var config = require('../../config');
const app = express();
const hangoutRouter = express.Router();

app.use('/', hangoutRouter);

hangoutRouter.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

hangoutRouter.route('/')
  .get(function (req, res) {
    res.json({ 'message': 'Welcome to the Hangouts API' });
  })

  //POST: Searches the database for an empty secondPerson. If it finds an open date, add user to Hangout obj
  //Adds date to User obj
  //If it can't, creates new date object in DB. Populates the firstPerson and Event simultaneously, then adds it to the user object
  .post(function (req, res) {
    let hangout = new Hangout();
    let activityObject = parseJSON(req.body.activity);
    let userData = User.findOne({ 'fbToken': req.body.user });

    userData.then(function (user) {
      var checkOpenDates = Hangout.find({
        $and: [
          {
            $or: [{ 'first_person': null }, { 'second_person': null }]
          },
          {'activity.id': activityObject.id}
        ]
      })

      checkOpenDates.then(function (open) {
        var promiseArray = [];

        for (let i = 0; i < open.length; i++) {
          let prom = new Promise(function(res, rej) {
            User.findOne({ 'fbToken': open[i].first_person }, function (err, data) {
              if (err) return err;
              res(data);
            });
          });
          promiseArray.push(prom);
        }

        Promise.all(promiseArray).then(function (values) {
          for (let i = 0; i < values.length; i++) {
            if (matching_algorithm(user, values, i)) {
              //If it's here, then there was a good hangout to join
              let suitableHangout = open[i];
              // If you can find a suitable hangout to join,
              // You're definitely gonna be the second person.
                if (!suitableHangout.second_person) {
                    suitableHangout.second_person = req.body.user;

                    let hangoutId = suitableHangout.id;
                    let firstPerson = suitableHangout.first_person;
                    let secondPerson = req.body.user;
                    let categories = ['restaurants'];

                    req.body.latitude = suitableHangout.activity.coordinates.latitude;
                    req.body.longitude = suitableHangout.activity.coordinates.longitude;

                    //look for restaurant here
                    let restaurant_promise = get_restaurant(req, categories);
                    Promise.all(restaurant_promise).then(values => {
                        let restaurantListObject = convertValueArrayAndCategoriesToObject(values, categories)
                            .restaurants.businesses;
                        let restaurant = randomizeSelection(restaurantListObject);

                        suitableHangout.restaurant = restaurant;

                        // Save this to the HANGOUT in the db
                        let hangoutPromise = suitableHangout.save(function (err) {
                            if (err) {
                                res.status(401).json(err);
                                return;
                            }
                        });

                        //Save the hangout object to second_person
                        let secondPersonPromise;
                        let secondPersonObject2;
                        secondPersonPromise = User.findOne({'fbToken': secondPerson}, function (err, secondPersonObject) {
                            secondPersonObject2 = secondPersonObject;
                            secondPersonObject.hangouts.unshift(suitableHangout);
                            secondPersonObject.save(function (err) {
                                if (err) {
                                    res.status(404).json(err);
                                    return;
                                }
                            });
                        });

                        // Save the second_person to the first_person.activity[i].second_person in the db
                        let firstPersonPromise;
                        let firstPersonObject2;
                        firstPersonPromise = User.findOne({'fbToken': firstPerson}, function (err, firstPersonObject) {
                            firstPersonObject2 = firstPersonObject;
                            let i = 0;
                            while (i < firstPersonObject.hangouts.length && firstPersonObject.hangouts[i].id !== hangoutId) {
                                i++;
                            }
                            firstPersonObject.hangouts[i].second_person = secondPerson;
                            firstPersonObject.hangouts[i].restaurant = restaurant;

                            firstPersonObject.save(function (err) {
                                if (err) {
                                    res.status(404).json(err);
                                    return;
                                }
                            });
                        });

                        Promise.all([hangoutPromise, firstPersonPromise, secondPersonPromise]).then(function (values) {
                            res.status(200).json({'Message': 'Matched'});
                            var sg = require('sendgrid')(config.apiEmailKey);
                            var emptyReq = sg.emptyRequest({
                                method: 'POST',
                                path: '/v3/mail/send',
                                body: {
                                    personalizations: [
                                        {
                                            to: [
                                                {
                                                    email: firstPersonObject2.email,
                                                },
                                            ],
                                            bcc: [
                                                {
                                                    email: secondPersonObject2.email,
                                                }
                                            ],
                                            subject: '[WYNK] We found a match for you!',
                                        },
                                    ],
                                    from: {
                                        email: 'test@example.com',
                                    },
                                    content: [
                                        {
                                            type: 'text/html',
                                            value: '<img src="logo.png"></br>' +
                                            '<img src="match.jpg"></br>' +
                                            '<h1>Hello friend,</h1></br>' +
                                            '<h2>We found a match for you!</h2></br>' +
                                            '<h2>Click <a href="wynk.world/results">here</a> to see who your match is! Then celebrate!</h2>',
                                        },
                                    ],
                                },
                            });

                            sg.API(emptyReq, function (error, response) {
                                if (error) {
                                    console.log('Error response received');
                                }
                            });
                        })
                    });
                }
            //DEAD ZONE
                else {

            }
            //THIS IS GOOD
            return;
          } else {

          }
        }
        save_solo_hangout(req, res, hangout, activityObject);
        return;
        
      }).then(function (values) {
        
      })
    })
  })
})
  //PUT: Adds to User Document in the Database (Used for restaurant finder and user finder)
  .put(function (req, res) {
    Hangout.findOne({
      $or: [
        {'first_person': req.params.user_fb_token},
        {'second_person': req.params.user_fb_token}
      ]}, (err, hangoutObject) => {
        res.json(hangoutObject);
      }
    );
  });
  
hangoutRouter.route('/user/:user_fb_token')
  //GET: Returns the user
  .get(function (req, res) {
    Hangout.findOne({
      $or: [
        {'first_person': req.params.user_fb_token}, 
        {'second_person': req.params.user_fb_token}
      ]}, (err, hangoutObject) => {
        res.json(hangoutObject);
    });
  })

function get_restaurant (req, categories) {
    req.body.latitude = req.body.latitude || 33.6506;
    req.body.longitude = req.body.longitude || -117.7435; //irvine spectrum
    req.body.price = '1,2';
    req.body.limit = 20;

    let promiseArray = getEvent(req.body, categories);
    return promiseArray;
}

function save_solo_hangout(req, res, hangout, activityObject) {
  hangout.first_person = req.body.user;
  hangout.activity = activityObject;

  //Saves to the USER and HANGOUT document
  //Saves to Hangout
  let hangoutPromise = hangout.save(function (err) {
    if (err) {
      res.status(401).json('Error', err);
      return;
    }
  });

  // Saves to USER
  User.findOne({'fbToken': req.body.user}, function (err, userObj) {
    userObj.hangouts.unshift(hangout);
    userObj.save(function (err) {
      if (err) {
        res.status(401).json('Error', err);
        return;
      }
    });
  });

  Promise.all([hangoutPromise]).then(function (values) {
    res.status(200).json({ 'message': 'hangout saved'});
  });
}

function matching_algorithm (user, values, i) {

  return (user.looking_for.pet === values[i].interests.pet && 
          user.looking_for.gender === values[i].gender &&
          user.interests.pet === values[i].looking_for.pet &&
          user.gender === values[i].looking_for.gender);
}

export default hangoutRouter;