import express from 'express';
import mongoose from 'mongoose';
import User from '../models/user';
import parseJSON from '../routing/parse_json';

function handlePut(err, user, req, res) {
    if (err) {
        res.send('Error Saving User. Please try again.');
        return;
    }

    if (req.body.username) user.username = req.body.username;
    if (req.body.email) user.email = req.body.email;
    if (req.body.givenName) user.given_name = req.body.givenName;
    if (req.body.familyName) user.family_name = req.body.familyName;
    if (req.body.age) user.age = req.body.age;
    if (req.body.gender) user.gender = req.body.gender;
    if (req.body.biography) user.biography = req.body.biography;

    if (req.body.dietaryRestrictions) user.dietary_restrictions = req.body.dietaryRestrictions;

    if (req.body.lookingFor) user.looking_for.gender = parseJSON(req.body.lookingFor).gender || null;
    if (req.body.lookingFor) user.looking_for.pet = parseJSON(req.body.lookingFor).pet || null;

    if (req.body.interests) user.interests.pet = parseJSON(req.body.interests).pet || null;
    if (req.body.profilePicture) user.profile_picture = req.body.profilePicture;

    user.save(function (err) {
        if (err) {
            res.send(err);
            return;
        }
        res.json({message: 'User Updated'});
    })
}

export default handlePut;
