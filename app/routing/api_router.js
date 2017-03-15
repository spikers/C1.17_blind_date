import express from 'express';
import mongoose from 'mongoose';
import User from '../models/user';
import handlePut from './handle_put';

const app = express();
const apiRouter = express.Router();

apiRouter.use(function (req, res, next) {
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
            if (_USER) return;
            user.save(function (err) {
                if (err) {
                    res.send(err);
                    return;
                }
                res.json({message: 'User Created!'});
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
        //User.findById(req.params.user_id, function (err, user) {
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

// function handlePut(err, user, req, res) {
//     if (err) {
//         res.send('Error Saving User. Please try again.');
//         return;
//     }
//     if (req.body.username) user.username = req.body.username;
//     //user.password = req.body.password;
//     if (req.body.email) user.email = req.body.email;
//     if (req.body.name) user.name = req.body.name;
//     if (req.body.age) user.age = req.body.age;
//     if (req.body.gender) user.gender = req.body.gender;
//     if (req.body.biography) user.biography = req.body.biography;
//     user.save(function (err) {
//         if (err) {
//             res.send(err);
//             return;
//         }
//         res.json({message: 'User Updated'});
//     })
// }

export default apiRouter;