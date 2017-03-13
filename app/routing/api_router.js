import express from 'express';
import mongoose from 'mongoose';
import User from '../models/user';

const app = express();
const apiRouter = express.Router();



// Initialization. But this time, it's for 'localhost/api'
apiRouter.use(function (req, res, next) {
    next();
});

// I do it this way because it's one route and I'm only doing 'get' on it
apiRouter.get('/', function (req, res) {
    res.json({ message: 'Hooray! Welcome to our API!'});
});

apiRouter.post('/', function(req, res) {
    res.json({ message: 'Yay Post' });
});

// This is the biggie.
// So when you get a Post, create the user. When you receieve a Get, get all users.

// The reason why it's different from above is I'm trying to handle Post and Get requests

apiRouter.route('/user')
    .post(function (req, res) {
        var user = new User();
        // user.username = req.body.username;
        // //user.password = req.body.password;
        // user.email = req.body.email;
        // user.name = req.body.name;
        // user.age = req.body.age;
        // user.gender = req.body.gender;
        // user.biography = req.body.biography;
        user.fbToken = req.body.fbToken;
        // user.admin = 0;
        User.findOne({'fbToken': req.body.fbToken}, (err, _USER) => {
            //Dirty solution to check to see if a user has been created yet.
            if (_USER) return;

            //If it's a new user, create the user
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


// The '/user/:user_id' is this:
// :user_id is stored inside req.params.user_id
// :chess_war would be automatically stored inside req.params.chess_war
// :hey is stored in req.params.hey

// So if you did a Get request to '/user/gagaga', and it was written '/user/:name'
// You can access 'gagaga' in req.params.name

// User.findById is probably a mongoose method used to interface with the mongo db


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

    //change this for the love of god as a soft delete
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

function handlePut(err, user, req, res) {
    if (err) {
        res.send('Error Saving User. Please try again.');
        return;
    }
    if (req.body.username) user.username = req.body.username;
    //user.password = req.body.password;
    if (req.body.email) user.email = req.body.email;
    if (req.body.name) user.name = req.body.name;
    if (req.body.age) user.age = req.body.age;
    if (req.body.gender) user.gender = req.body.gender;
    if (req.body.biography) user.biography = req.body.biography;
    //user.fbToken = req.body.fbToken;

    user.save(function (err) {
        if (err) {
            res.send(err);
            return;
        }
        res.json({message: 'User Updated'});
    })
}

export default apiRouter;