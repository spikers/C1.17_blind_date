import express from 'express';
import mongoose from 'mongoose';
import User from '../models/user';
import Hangout from '../models/hangout';
import getEvent from './yelp_data';
import convertValueArrayAndCategoriesToObject from './convert_to_object';
import randomizeSelection from './randomize';
import parseJSON from './parse_json';
//import restaurantActivity from './restaurant_activity';

const app = express();
const hangoutRouter = express.Router();

app.use('/', hangoutRouter);

hangoutRouter.use(function (req, res, next) {
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

    let checkOpenDates = Hangout.findOne({
      $and: [
        {
          $or: [{ 'first_person': null }, { 'second_person': null }]
        },
        {'activity.id': activityObject.id}

      //Put preferences here
      ]}, function (value) {
        
      }
    );

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
          })

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

            firstPersonObject.save(function (err) {
              if (err) {
                res.status(404).json(err);
                return;
              }
              //res.status(200).json({'message': 'firstPersonObjectAppended'});

            });

          });


          Promise.all([hangoutPromise]).then(function (values) {
            res.status(200).json({'Message': 'Matched'});
          });


        } 

        
        if (!suitableHangout.first_person) {
          console.log(suitableHangout.second_person);
        }

      } else {
        "Cosmic Rays: hangoutRouter.route('/').post()";
      }
    });


  })

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

export default hangoutRouter;