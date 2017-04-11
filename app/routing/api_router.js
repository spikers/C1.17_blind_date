import express from 'express';
import mongoose from 'mongoose';
import User from '../models/user';
import handlePut from './handle_put';

const app = express();
const apiRouter = express.Router();

apiRouter.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
    next();
});

apiRouter.get('/', function (req, res) {
    res.json({ message: 'Hooray! Welcome to our API!'});
});

apiRouter.post('/', function(req, res) {
    res.json({ message: 'Yay Post' });
});

apiRouter.route('/user')
    .post(function (req, res) {
        var user = new User();

        user.fbToken = req.body.fbToken;
        User.findOne({'fbToken': req.body.fbToken}, (err, _USER) => {
            if (_USER) {
                res.json({'status': 52, 'new_user': false});
                return;
            }
            user.save(function (err) {
                if (err) {
                    res.send(err);
                    return;
                }
                res.json({'status': 51, 'new_user': true});
            });
        });
    })
    .get(function (req, res) {
        User.find(function (err, users) {
            if (err) {
                res.send(err);
                return;
            }
            res.json(users);
        });
    });
apiRouter.route('/user/:user_id')
    .get(function (req, res) {
        User.findOne({'fbToken': req.params.user_id}, function (err, user) {
            if (err) {
                res.send(err);
                return;
            }

            res.json(user);
        });
    })
    .put(function (req, res) {
        User.findOne({ 'fbToken': req.params.user_id }, (err, user) => {
            if (err) {
                res.send(err);
                return;
            }
            handlePut(err, user, req, res);
        });
    })
    .delete(function (req, res) {
        User.remove({
            _id: req.params.user_id
        }, function (err, user) {
            if (err) {
                res.send(err);
                return;
            }

            res.json({ message: 'Successfully Deleted' });
        });
    });

export default apiRouter;