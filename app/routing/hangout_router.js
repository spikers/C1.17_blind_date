import express from 'express';
import mongoose from 'mongoose';
import User from '../models/user';
import Hangout from '../models/hangout';
import getEvent from './yelp_data';
import convertValueArrayAndCategoriesToObject from './convert_to_object';
import randomizeSelection from './randomize';
import parseJSON from './parse_json';
import { sg, emptyReq } from './email' ;
var config = require('../../config');


//import restaurantActivity from './restaurant_activity';

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
  //      Adds date to User obj
  //      If it can't, 
  //      Creates new date object in DB. Populates the firstPerson and Event simultaneously. 
  //      Then adds it to the user object
  .post(function (req, res) {
    let hangout = new Hangout();
    let activityObject = parseJSON(req.body.activity);

    // console.log(activityObject);
    // console.log('URL', activityObject.id); #########################################

    let userData = User.findOne({ 'fbToken': req.body.user });


    userData.then(function (user) {
      var checkOpenDates = Hangout.find({
        $and: [
          {
            $or: [{ 'first_person': null }, { 'second_person': null }]
          },
          {'activity.id': activityObject.id}
        //Put preferences here
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
              console.log('this is the match: ', values[i]);

              let suitableHangout = open[i];

              // If you can find a suitable hangout to join,
              // You're definitely gonna be the second person. 


/////This is good
              if (!suitableHangout.second_person) {
                suitableHangout.second_person = req.body.user;

                console.log('Suitable Hangout Found', suitableHangout);
                let hangoutId = suitableHangout.id;
                let firstPerson = suitableHangout.first_person;
                let secondPerson = req.body.user;
                let categories = ['restaurants'];

                req.body.latitude = suitableHangout.activity.coordinates.latitude;
                req.body.longitude = suitableHangout.activity.coordinates.longitude;
                console.log('suitable.activity.coords', suitableHangout.activity.coordinates);
                console.log('suitable .activity.longi', suitableHangout.activity.coordinates.latitude);
                console.log('reqbodylat', req.body.latitude);

                //look for restaurant here ++++++++++++++++++
                //restaurant = getRestaurant() +++++++++++++++++++++
                let restaurant_promise = get_restaurant(req, categories); //+++++++++++++++++++++
                //console.log(restaurant);
                Promise.all(restaurant_promise).then(values => {
                    let restaurantListObject = convertValueArrayAndCategoriesToObject(values, categories)
                        .restaurants.businesses;
                    let restaurant = randomizeSelection(restaurantListObject);

                    // return randomizedRestaurant;
                    //res.status(200).json(randomizedRestaurant);
                // }).catch(err => {console.log(err)});


                suitableHangout.restaurant = restaurant; //+++++++++++++++++++++++++++++++++
                console.log('this is the restaurant', restaurant);
                console.log('type', typeof restaurant);
                console.log('suitable hangout', suitableHangout);


                // Save this to the HANGOUT in the db (Working) #########################################
                let hangoutPromise = suitableHangout.save(function (err) {
                  if (err) {
                    res.status(401).json(err);
                    return;
                  }
                });

                //Save the hangout object to second_person (Working) ################################
                let secondPersonPromise;
                let secondPersonObject2;
                secondPersonPromise = User.findOne({'fbToken': secondPerson}, function (err, secondPersonObject) {
                  console.log(secondPersonObject);
                  secondPersonObject2 = secondPersonObject;
                  secondPersonObject.hangouts.unshift(suitableHangout);
                  secondPersonObject.save(function (err) {
                    if (err) {
                      res.status(404).json(err);
                      return;
                    }
                  });
                });

                // Save the second_person to the first_person.activity[i].second_person in the db (Working)##################
                let firstPersonPromise;
                let firstPersonObject2;
                firstPersonPromise = User.findOne({'fbToken': firstPerson}, function (err, firstPersonObject) {
                  // console.log(err);
                  // console.log(firstPersonObject.hangouts);
                    firstPersonObject2 = firstPersonObject;
                  let i = 0;
                  while (i < firstPersonObject.hangouts.length && firstPersonObject.hangouts[i].id !== hangoutId) {
                    i++;
                  }

                  firstPersonObject.hangouts[i].second_person = secondPerson;
                  firstPersonObject.hangouts[i].restaurant = restaurant; //++++++++++++++++++++++++++

                  firstPersonObject.save(function (err) {
                    if (err) {
                      res.status(404).json(err);
                      return;
                    }
                    //res.status(200).json({'message': 'firstPersonObjectAppended'});

                  });

                });


                Promise.all([hangoutPromise, firstPersonPromise, secondPersonPromise]).then(function (values) {
                    res.status(200).json({'Message': 'Matched'});
                    console.log('++++++++++++++email1+++++', firstPersonObject2.email);
                    console.log('++++++++++++++email2+++++', secondPersonObject2.email);
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
                                    value:'<img src="logo.png"></br>' +
                                    '<img src="match.jpg"></br>' +
                                    '<h1>Hello friend,</h1></br>' +
                                    '<h2>We found a match for you!</h2></br>' +
                                    '<h2>Click <a href="wynk.world/results">here</a> to see who your match is! Then celebrate!</h2>',
                                },
                            ],
                        },
                    });

                    sg.API(emptyReq, function(error, response) {
                        if (error) {
                            console.log('Error response received');
                        }
                        console.log('statusCode',response.statusCode);
                        console.log('body',response.body);
                        console.log('headers',response.headers);
                    });
                    //return;
                    //return;
                  })
                });


            }
            //DEAD ZONE
            else {

            }
///////THIS IS GOOD
            console.log('break here');
            return;
          } else {

          }

        
        }

        console.log('arrived here');
        save_solo_hangout(req, res, hangout, activityObject);
        return;
        
      }).then(function (values) {
        
      })
    })
  })
})

/*
      //Value here is: The a suitable hangout to join
      checkOpenDates.then(function (suitableHangout) {

        //If there's no suitable hangout to join, create one
        if (suitableHangout === null) {

          hangout.first_person = req.body.user;
          hangout.activity = activityObject;
          console.log(hangout);

          //// Saves to the USER and HANGOUT document
          // Saves to Hangout 
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
        } else if (suitableHangout) {
          // If you can find a suitable hangout to join,
          // You're definitely gonna be the second person. 

          if (!suitableHangout.second_person) {
            suitableHangout.second_person = req.body.user;

            console.log('Suitable Hangout Found');
            let hangoutId = suitableHangout.id;
            let firstPerson = suitableHangout.first_person;
            let secondPerson = req.body.user;
              let categories = ['restaurants'];


              //look for restaurant here ++++++++++++++++++
              //restaurant = getRestaurant() +++++++++++++++++++++
              let restaurant_promise = get_restaurant(req,categories); //+++++++++++++++++++++
              //console.log(restaurant);
              Promise.all(restaurant_promise).then(values => {
                  let restaurantListObject = convertValueArrayAndCategoriesToObject(values, categories)
                      .restaurants.businesses;
                  let restaurant = randomizeSelection(restaurantListObject);

                  // return randomizedRestaurant;
                  //res.status(200).json(randomizedRestaurant);
              // }).catch(err => {console.log(err)});


              suitableHangout.restaurant = restaurant; //+++++++++++++++++++++++++++++++++
              console.log(restaurant);
              console.log('type', typeof restaurant);
              console.log('suitable hangout', suitableHangout);


            // Save this to the HANGOUT in the db (Working) #########################################
            let hangoutPromise = suitableHangout.save(function (err) {
              if (err) {
                res.status(401).json(err);
                return;
              }
            });

            //Save the hangout object to second_person (Working) ################################
            let secondPersonPromise;
            User.findOne({'fbToken': secondPerson}, function (err, secondPersonObject) {
              console.log(secondPersonObject);
              secondPersonObject.hangouts.unshift(suitableHangout);
              secondPersonObject.save(function (err) {
                if (err) {
                  res.status(404).json(err);
                  return;
                }
              });
            });

            // Save the second_person to the first_person.activity[i].second_person in the db (Working)##################
            let firstPersonPromise;
            User.findOne({'fbToken': firstPerson}, function (err, firstPersonObject) {
              // console.log(err);
              // console.log(firstPersonObject.hangouts);
              let i = 0;
              while (i < firstPersonObject.hangouts.length && firstPersonObject.hangouts[i].id !== hangoutId) {
                i++;
              }

              firstPersonObject.hangouts[i].second_person = secondPerson;
              firstPersonObject.hangouts[i].restaurant = restaurant; //++++++++++++++++++++++++++
          
          firstPersonObject.save(function (err) {
              if (err) {
                console.log('++++++++++error+++++++++++++', err);
                res.status(404).json(err);
                return;
              }
              //res.status(200).json({'message': 'firstPersonObjectAppended'});

            });
            
          });
            
          Promise.all([hangoutPromise]).then(function (values) {
            res.status(200).json({'Message': 'Matched'});
            //emptyReq();
              var sg = require('sendgrid')(config.apiEmailKey);
              var emptyReq = sg.emptyRequest({
                  method: 'POST',
                  path: '/v3/mail/send',
                  body: {
                      personalizations: [
                          {
                              to: [
                                  {
                                      email: config.user1Email,
                                  },
                              ],
                              bcc: [
                                  {
                                      email: config.user2Email,
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
                              value:'<img src="logo.png"></br>' +
                              '<img src="match.jpg"></br>' +
                              '<h1>Hello friend,</h1></br>' +
                              '<h2>We found a match for you!</h2></br>' +
                              '<h2>Click <a href="wynk.world/results">here</a> to see who your match is! Then celebrate!</h2>',
                          },
                      ],
                  },
              });

              sg.API(emptyReq, function(error, response) {
                  if (error) {
                      console.log('Error response received');
                  }
                  console.log('statusCode',response.statusCode);
                  console.log('body',response.body);
                  console.log('headers',response.headers);
              });
            //return;
          }).catch(function (err) {
              console.log('err:' + err);
          });
              }).catch(err => {console.log(err)}); //++++++++++++++++++++++++FIX THIS+++++++++++++++++

          }

          
          if (!suitableHangout.first_person) {
            console.log(suitableHangout.second_person);
          }

        } else {
          "Cosmic Rays: hangoutRouter.route('/').post()";
        }
      });
  
    });
  })
*/
  // //AC2
  // function dothings() {

    

  // }

  //PUT: Adds to User Document in the Database (Used for restaurant finder and user finder)
  //Maybe delete this? Not sure
  .put(function (req, res) {
    Hangout.findOne({
      $or: [
        {'first_person': req.params.user_fb_token},
        {'second_person': req.params.user_fb_token}
      ]}, (err, hangoutObject) => {
        console.log(hangoutObject.activity);
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
        console.log(hangoutObject);
        res.json(hangoutObject);
    });
  })

function get_restaurant (req, categories) {
    req.body.latitude = req.body.latitude || 33.6506;
    req.body.longitude = req.body.longitude || -117.7435; //irvine spectrum
    req.body.price = '1,2';
    req.body.limit = 20;
    //let categories = ['restaurants'];

    let promiseArray = getEvent(req.body, categories);
    // Promise.all(promiseArray).then(values => {
    //     let restaurantListObject = convertValueArrayAndCategoriesToObject(values, categories)
    //         .restaurants.businesses;
    //     let randomizedRestaurant = randomizeSelection(restaurantListObject);
    //
    //     return randomizedRestaurant;
    //     //res.status(200).json(randomizedRestaurant);
    // }).catch(err => {console.log(err)});
    return promiseArray;
}

function save_solo_hangout(req, res, hangout, activityObject) {
  hangout.first_person = req.body.user;
  hangout.activity = activityObject;

  //// Saves to the USER and HANGOUT document
  // Saves to Hangout 
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
  console.log('Given Name: ', user.given_name);
  console.log('Potential GN:', values[i].given_name);
  console.log('ulfp', user.looking_for.pet === values[i].interests.pet);
  console.log('ulfg', user.looking_for.gender === values[i].gender);
  console.log('uip', user.interests.pet === values[i].looking_for.pet);
  console.log('uig', user.gender === values[i].looking_for.gender);

  return (user.looking_for.pet === values[i].interests.pet && 
                user.looking_for.gender === values[i].gender &&
                user.interests.pet === values[i].looking_for.pet &&
                user.gender === values[i].looking_for.gender);
}

// function matchingAlgorithm (lookingFor, interests) {
//     for (let key in lookingFor) {
//         if (lookingFor[key] !== interests[key]) {
//             return false;
//         }
//     }
//     return true;
// }

export default hangoutRouter;