import express from 'express';
import mongoose from 'mongoose';
import User from '../models/user';
import fs from 'fs';

const app = express();
const yelpRouter = express.Router();

yelpRouter.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

yelpRouter.route('/')
    .get(function (req, res) {
        fs.readFile('./public/yelp.html', 'utf8', (err, data) => {
            if (err) res.send(err);
            res.send(data);
        });
    });

export default yelpRouter;