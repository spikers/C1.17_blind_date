import express from 'express';
import mongoose from 'mongoose';
import User from '../models/user';
import getEvent from './yelp_data';

const app = express();
const hangoutRouter = express.Router();



hangoutRouter.use(function (req, res, next) {
    next();
});

hangoutRouter.route('/')
    .get(function (req, res) {
        res.json({ 'message': 'Welcome to the Hangouts API' });
    })

hangoutRouter.route('/user/:user_id')

//GET: Returns the user
    .get(function (req, res) {
        Hangout.findOne({
            $or: [
                {'first_person': req.params.user_id},
                {'second_person': req.params.user_id}
            ]}, (err, hangoutObject) => {
            console.log(hangoutObject);
            res.json(hangoutObject);
        });
    })

    //POST: Searches the database for an empty secondPerson. If it finds an open date,
    //      If it can't,
    //      Creates new date object in DB. Populates the firstPerson and Event simultaneously
    .post(function (req, res) {
        let hangout = new Hangout();

        hangout.first_person = req.body.first_person;
        hangout.activity = JSON.parse(req.body.activity);

        hangout.save(function (err) {
            if (err) {
                res.json('Error', err);
                return;
            }
            res.json({ 'message': 'hangout saved' });
        })
    })

    //PUT: Adds to User Document in the Database (Used for restaurant finder and user finder)
    .put(function (req, res) {
        Hangout.findOne({
                $or: [
                    {'first_person': req.params.user_id},
                    {'second_person': req.params.user_id}
                ]}, (err, hangoutObject) => {
                console.log(hangoutObject.activity);
                res.json(hangoutObject);
            }
        );
    });


hangoutRouter.route('/test')
    .get(function (req, res) {
        Hangout.findOne({ 'activity.display_phone': '(949) 786-9625' }, function(err, hangout) {
            console.log(err);
            res.json(hangout);
        })
    })

hangoutRouter.route('/hangout/:hangout_id')
    .get(function (req, res) {
        Hangout.findById(req.params.hangout_id, (err, hangoutObject) => {
            console.log(hangoutObject.activity.rating);
            res.json(hangoutObject);
        });
    });

//This can probably be a GET request
hangoutRouter.route('/restaurant')
    .post(function (req, res) {

        //TPADD Planning to use the DB to pull the location
        req.body.latitude = 33.6506;
        req.body.longitude = -117.7435; //irvine spectrum

        //If you want a smaller restaurant pool, then choose this
        req.body.price = '1,2';
        req.body.limit = 20;

        //This can be vegan and/or vegetarian or anything
        let categories = ['restaurants'];


        let promiseArray = getEvent(req.body, categories);

        //When they all resolve, I'm gonna return all the values. This is an array of yelp objs
        Promise.all(promiseArray).then(values => {
            let restaurantListObject = convertValueArrayAndCategoriesToObject(values, categories)
                .restaurants.businesses;
            let randomizedRestaurant = randomizeSelection(restaurantListObject)

            res.status(200).json(randomizedRestaurant);
        }).catch(err => {console.log(err)});
    })

hangoutRouter.route('/activity')
    .post(function (req, res) {
        console.log('Activity Endpoint Called');
        req.body.latitude = 33.6506;
        req.body.longitude = -117.7435; //irvine spectrum

        //If you want less activities, then change this
        req.body.limit = 3;

        //TPADD Planning on making these categories dynamic based on the week
        let categories = ['movietheaters', 'bowling', 'museums', 'artclasses'];

        //I get an array of promises from getEvent, one for each category.
        let promiseArray = getEvent(req.body, categories);

        //When they all resolve, I'm gonna return all the values. This is an array of yelp objs
        Promise.all(promiseArray).then(values => {
            let activityListObject = convertValueArrayAndCategoriesToObject(values, categories);
            res.status(200).json(activityListObject);
        }).catch(err => {console.log(err)});
    })
function convertValueArrayAndCategoriesToObject(valueArray, categories) {
    let valueObject = {};
    for (let i = 0; i < categories.length; i++) {
        valueObject[categories[i]] = valueArray[i];
    }
    return valueObject;
}
function randomizeSelection(choicesObject) {
    let index = Math.floor(Math.random() * Object.keys(choicesObject).length);
    let selection = choicesObject[index];
    console.log(selection);
    return selection;
}

export default hangoutRouter;