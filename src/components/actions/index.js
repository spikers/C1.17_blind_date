import axios from 'axios';
import yelp from '../../test_data/yelp_obj';
import user from '../../test_data/user_obj';

const instance = axios.create({
  headers:{
    'Content-Type' : 'application/x-www-form-urlencoded'
  }
});
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const GET_PROFILE = 'GET_PROFILE';
export const SAVE_PROFILE = 'SAVE_PROFILE';

const BASE_URL = null;

export function getProfile(){
  // const request = instance.get(BASE_URL);
  const request = user;
  return ({
    type: GET_PROFILE,
    payload: request
  });
}

export function updateProfile(user){
  const request = instance.post(BASE_URL,user);
  return ({
    type:UPDATE_PROFILE,
    payload: request
  });
}

export function saveProfile(user){
  const request = instance.post(BASE_URL, user);
  return({
    type:SAVE_PROFILE,
    payload: request
  })
}