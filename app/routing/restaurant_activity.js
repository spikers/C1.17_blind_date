import express from 'express';
import mongoose from 'mongoose';
import User from '../models/user';
import getEvent from './yelp_data';
import hangoutRouter from './hangout_router';
import convertValueArrayAndCategoriesToObject from './convert_to_object';
import randomizeSelection from './randomize';


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
        let categories = ['arts', 'museums', 'comedyclubs'];
        let promiseArray = getEvent(req.body, categories);
        Promise.all(promiseArray).then(values => {
            let activityListObject = convertValueArrayAndCategoriesToObject(values, categories);
            res.status(200).json(activityListObject);
        }).catch(err => {console.log(err)});
    });

export default restaurantActivity;