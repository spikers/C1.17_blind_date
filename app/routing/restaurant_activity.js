import express from 'express';
import mongoose from 'mongoose';
import User from '../models/user';
import getEvent from './yelp_data';
import hangoutRouter from './hangout_router';
//import convertAndRandomize from './convert_and_randomize';

const app = express();
const restaurantActivity = express.Router();

hangoutRouter.route('/test')
    .get(function (req, res) {
        Hangout.findOne({ 'activity.display_phone': '(949) 786-9625' }, function(err, hangout) {
            console.log(err);
            res.json(hangout);
        })
    });

hangoutRouter.route('/hangout/:hangout_id')
    .get(function (req, res) {
        Hangout.findById(req.params.hangout_id, (err, hangoutObject) => {
            console.log(hangoutObject.activity.rating);
            res.json(hangoutObject);
        });
    });

hangoutRouter.route('/restaurant')
    .post(function (req, res) {
        req.body.latitude = 33.6506;
        req.body.longitude = -117.7435; //irvine spectrum
        req.body.price = '1,2';
        req.body.limit = 20;
        let categories = ['restaurants'];

        let promiseArray = getEvent(req.body, categories);
        Promise.all(promiseArray).then(values => {
            let restaurantListObject = convertValueArrayAndCategoriesToObject(values, categories)
                .restaurants.businesses;
            let randomizedRestaurant = randomizeSelection(restaurantListObject)

            res.status(200).json(randomizedRestaurant);
        }).catch(err => {console.log(err)});
    });

hangoutRouter.route('/activity')
    .post(function (req, res) {
        console.log('Activity Endpoint Called');
        req.body.latitude = 33.6506;
        req.body.longitude = -117.7435;
        req.body.limit = 3;
        let categories = ['movietheaters', 'bowling', 'museums', 'artclasses'];
        let promiseArray = getEvent(req.body, categories);
        Promise.all(promiseArray).then(values => {
            let activityListObject = convertValueArrayAndCategoriesToObject(values, categories);
            res.status(200).json(activityListObject);
        }).catch(err => {console.log(err)});
    });

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


export default restaurantActivity;