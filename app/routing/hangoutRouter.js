import express from 'express';
import mongoose from 'mongoose';
import User from '../models/user';
import getEvent from './yelp_data';

const app = express();
const hangoutRouter = express.Router();

app.use('/', hangoutRouter);

hangoutRouter.use(function (req, res, next) {
    next();
});

hangoutRouter.route('/')
    .get(function (req, res) {
        res.json({ 'message': 'Welcome to the Hangouts API' });
    });

hangoutRouter.route('/user/:user_id')

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

export default hangoutRouter;