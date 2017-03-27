import express from 'express';
import mongoose from 'mongoose';
import User from '../models/user';
//import hangoutRouter from './hangout_router'
//import restaurantActivity from './restaurant_activity';

// const app = express();
// const convertAndRandomize = express.Router();

export default function convertValueArrayAndCategoriesToObject(valueArray, categories) {
    let valueObject = {};
    for (let i = 0; i < categories.length; i++) {
        valueObject[categories[i]] = valueArray[i];
    }
    return valueObject;
}

//export default convertValueArrayAndCategoriesToObject;