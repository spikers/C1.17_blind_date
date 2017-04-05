import express from 'express';
import mongoose from 'mongoose';
import User from '../models/user';
import fs from 'fs';
import path from 'path';

const app = express();
const router = express.Router();

//Need to initialize this here
router.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
    next();
});

router.use(express.static(path.resolve(__dirname, '..', '..', 'public')));

router.get('/', function (req, res) {
    fs.readFile('./public/index.html', 'utf8', (err, data) => {
        if (err) {
            res.send(err);
            return;
        }
        res.send(data);
    });
});


router.get('/bundle.js', function (req, res) {
    res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'bundle.js'));
});

export default router;
