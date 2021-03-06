import axios from 'axios';
import yelp from '../../test_data/yelp_obj';
import user from '../../test_data/user_obj';
import events from '../../test_data/events_obj';
import {browserHistory} from 'react-router';
import {store} from '../../index'

const instance = axios.create({
  headers:{
    'Content-Type' : 'application/x-www-form-urlencoded'
  }
});

export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const GET_PROFILE = 'GET_PROFILE';
export const GET_SECOND_PROFILE = 'GET_SECOND_PROFILE'
export const SAVE_PROFILE = 'SAVE_PROFILE';
export const GET_EVENTS = 'GET_EVENTS';
export const SEND_EVENT_CHOICE = 'SEND_EVENT_CHOICE';
export const SEND_LOGIN = "SEND_LOGIN";
export const SET_EVENT_CHOICE="SET_EVENT_CHOICE";
export const GET_HANGOUT="GET_HANGOUT";
export const GET_RESTAURANT="GET_RESTAURANT";
export const CHANGE_AUTH ="CHANGE_AUTH";
export const SET_FB_TOKEN="SET_FB_TOKEN";
export const SET_GEOLOCATION="SET_GEOLOCATION";
export const CHECK_IN = "CHECK_IN";
export const CHECK_IN_NOTIFICATION="CHECK_IN_NOTIFICATION";

const BASE_URL = 'http://54.202.15.233:8000/api/';

//LOGIN PAGE ACTIONS
export function setFBToken(token){
  localStorage.setItem('token', token)
  return ({
    type: SET_FB_TOKEN,
    payload: token
  })
}

export function sendLogin(){
  const request = instance.post(`${BASE_URL}user/18421221512`)
}

//PROFILE PAGE ACTIONS
export function getProfile(id){
  console.log('getProfile called')
  const request = instance.get(`${BASE_URL}user/${id}`);
  return ({
    type: GET_PROFILE,
    payload: request
  });
}

export function getSecondProfile(id){
  const request = instance.get(`${BASE_URL}user/${id}`);
  return ({
    type: GET_SECOND_PROFILE,
    payload: request
  });
}

export function updateProfile(id, forms){
  let encodedURI = encodeURI(
    'username=' + (forms.username || '') + 
    '&givenName=' + (forms.given_name || '') + 
    '&familyName=' + (forms.family_name||'') + 
    '&email=' + (forms.email || '') + 
    '&age=' + (forms.age || '') + 
    '&gender=' + (forms.gender || '') + 
    '&biography=' + (forms.biography || '') + 
    '&dietaryRestrictions=' + (forms.dietary_restrictions || '') + 
    '&lookingFor=' + (JSON.stringify(forms.looking_for) || '') + 
    '&interests=' + (JSON.stringify(forms.interests) || ''))

    let xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function(data) {
      getProfile(id);
    }.bind(this));
    xhr.open('PUT', `${BASE_URL}user/${id}`);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(encodedURI);
  return ({
    type:UPDATE_PROFILE,
    payload: forms
  });
}

//EVENTS PAGE ACTIONS
export function getEvents(){
  const request = instance.post(`${BASE_URL}hangout/activity`)
  return({
    type: GET_EVENTS,
    payload: request
  })
}

// export function sendEventChoice(id, choice){
//   console.log('event choice sent')
// var id = id
// var data = "user=" + id + "&activity=" + encodeURIComponent(JSON.stringify(choice));
// var xhr = new XMLHttpRequest();
// xhr.addEventListener("load", function () {
//         getProfileDelayed(id)
//   }.bind(this)); //callback is bound in order to maintain "id"

// xhr.open("POST", "http://54.202.15.233:8000/api/hangout");
// xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

// xhr.send(data);
// }

// export function getProfileDelayed(id){
//   return function (dispatch) {
//     console.log('id', id)
//     instance.get(`${BASE_URL}user/${id}`)
//     .then(resp=>{
//       dispatch({
//         type: GET_PROFILE,
//         payload: resp
//       })
//       browserHistory.push('/results')
//     })
//     .catch(err=>{
//       console.log('Oops, error!', err)
//     })
//   }.bind(this)
// }

export function setEventChoice(choice){
  return({
    type:SET_EVENT_CHOICE,
    payload: choice
  })
}

export function getRestaurant(){
  const request = instance.post('http://54.202.15.233:8000/api/hangout/restaurant')
  return({
    type: GET_RESTAURANT,
    payload: request
  })
}

export function authenticate(isLoggedIn){
  return {
    type: CHANGE_AUTH,
    payload: isLoggedIn
  }
}

export function setGeolocation(loc){
  return{
    type: SET_GEOLOCATION,
    payload: loc
  }
}
export function checkInNotification(bool){
  return{
    type: CHECK_IN_NOTIFICATION,
    payload: bool
  }
}