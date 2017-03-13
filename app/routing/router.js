import express from 'express';
import mongoose from 'mongoose';
import User from '../models/user';

const app = express();
const router = express.Router();

// Need to initialize this here
router.use(function (req, res, next) {
    next();
});


// If you go to 'localhost/' then send the index.html file.
// The reason why this works is I'm using the variable 'router', not 'apiRouter'.
// 'router' is bound below, in my `app.use('/', router);`

router.get('/', function (req, res) {
    fs.readFile('./public/index.html', 'utf8', (err, data) => {
        if (err) {
            res.send(err);
            return;
        }
        res.send(data);
    });
});


router.get('/choose', function (req, res) {
    fs.readFile('./public/choose.html', 'utf8', (err, data) => {
        if (err) {
            res.send(err);
            return;
        }
        res.send(data);
    });
});


router.get('/login', function (req, res) {
    fs.readFile('./public/login.html', 'utf8', (err, data) => {
        if (err) res.send(err);
        res.send(data);
    });
});

router.get('/css/:css', function (req, res) {
    fs.readFile('./public/css/' + req.params.css, 'utf8', (err, data) => {
        res.send(data);
    });
});

router.get('/js/:js', function (req, res) {
    fs.readFile('./public/js/' + req.params.js, 'utf8', (err, data) => {
        res.send(data);
    });
});

export default router;