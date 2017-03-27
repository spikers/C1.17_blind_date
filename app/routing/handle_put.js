import express from 'express';
import mongoose from 'mongoose';
import User from '../models/user';

function handlePut(err, user, req, res) {
    if (err) {
        res.send('Error Saving User. Please try again.');
        return;
    }
    if (req.body.username) user.username = req.body.username;
    //user.password = req.body.password;
    if (req.body.email) user.email = req.body.email;
    if (req.body.givenName) user.given_name = req.body.givenName;
    if (req.body.familyName) user.family_name = req.body.familyName;
    if (req.body.age) user.age = req.body.age;
    if (req.body.gender) user.gender = req.body.gender;
    if (req.body.biography) user.biography = req.body.biography;
    user.save(function (err) {
        if (err) {
            res.send(err);
            return;
        }
        res.json({message: 'User Updated'});
    })
}

export default handlePut;