import express from 'express';
import mongoose from 'mongoose';
import User from '../models/user';

export default function randomizeSelection(choicesObject) {
    let index = Math.floor(Math.random() * Object.keys(choicesObject).length);
    let selection = choicesObject[index];
    console.log(selection);
    return selection;
}