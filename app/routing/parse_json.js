import express from 'express';
import mongoose from 'mongoose';
import User from '../models/user';


//Always wrap your JSON.parse in a try-catch block. This simply replaces JSON.parse with the safer version
function parseJSON(item, times = 0) {
    try {
        //if (typeof item === 'string') {
            return JSON.parse(item);
       // }
       //  else if (typeof item === 'object') {
       //      return item;
       //  }
    } catch (e) {
        if (times < 3) {
            return parseJSON(item, ++times);
        } else {
            console.log(e);
            return {'error': 'Random String: crnaF27Qgw'};
        }
    }
}

export default parseJSON;