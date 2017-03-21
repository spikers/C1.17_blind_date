import axios from 'axios';
import yelp from '../../test_data/yelp_obj';
import user from '../../test_data/user_obj';
import events from '../../test_data/events_obj';

const instance = axios.create({
  headers:{
    'Content-Type' : 'application/x-www-form-urlencoded'
  }
});
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const GET_PROFILE = 'GET_PROFILE';
export const SAVE_PROFILE = 'SAVE_PROFILE';
export const GET_EVENTS = 'GET_EVENTS';
export const SEND_EVENT_CHOICE = 'SEND_EVENT_CHOICE';
export const SEND_LOGIN = "SEND_LOGIN";

const BASE_URL = 'http://54.202.15.233:8000/api/';

//LOGIN PAGE ACTIONS
export function sendLogin(){
  const request = instance.post(`${BASE_URL}user/18421221512`)
}

//PROFILE PAGE ACTIONS
export function getProfile(id){
  id = 136173360242729;
  const request = instance.get(`${BASE_URL}user/${id}`);
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

//EVENTS PAGE ACTIONS
export function getEvents(){
  const request = instance.post(`${BASE_URL}hangout/activity`);
  return({
    type: GET_EVENTS,
    payload: request
  })
}

export function sendEventChoice(choice){
  const request = instance.post(BASE_URL, choice);
  return({
    type:SEND_EVENT_CHOICE,
    payload: request
  })
}