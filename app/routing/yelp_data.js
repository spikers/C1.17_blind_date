import express from 'express';
import mongoose from 'mongoose';
import User from '../models/user';
import qs from 'querystring';
import request from 'request';
import config from '../../config';
import parseJSON from './parse_json';

const yelpToken = config.yelpToken;

// This returns an array of promises. This can be an activity or restaurant.
function getEvent(params, categories) {
    params['sort_by'] = 'rating';

    var promiseArray = categories.map(item => {
        //For every category, get Yelp data for that category
        params.radius = 500; //meters
        params.categories = item;
        return getYelpData(params);
    });

    return promiseArray;
}

//Please do not call this directly. Call getEvent.
function getYelpData(params) {
    let paramString = qs.stringify(params);
    return new Promise((resolve, reject) => {
        recursiveYelpHandler(paramString);

        function recursiveYelpHandler(paramStr) {
            request({
                method: 'GET',
                url: 'https://api.yelp.com/v3/businesses/search?' + paramStr,
                headers: {
                    //Token is global
                    Authorization: 'Bearer ' + yelpToken
                }
            }, (err, _, body) => {
                body = parseJSON(body);

                let paramObject = qs.parse(paramStr);

                if (body.total < paramObject.limit && paramObject.radius < 40000) {
                    //Expand range if not enough
                    paramObject.radius *= 2;
                    paramStr = qs.stringify(paramObject);
                    recursiveYelpHandler(paramStr);
                } else if (body.total < paramObject.limit) {
                    //If range is too large, give up
                    reject("Error: Out of Range");
                } else if (body.total >= paramObject.limit) {
                    //It worked
                    resolve(body);
                } else {
                    console.log("Cosmic Rays at getEvent");
                }
            });
        }
    })
}

export default getEvent;