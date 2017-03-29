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
export const GET_SECOND_PROFILE = 'GET_SECOND_PROFILE'
export const SAVE_PROFILE = 'SAVE_PROFILE';
export const GET_EVENTS = 'GET_EVENTS';
export const SEND_EVENT_CHOICE = 'SEND_EVENT_CHOICE';
export const SEND_LOGIN = "SEND_LOGIN";
export const SET_EVENT_CHOICE="SET_EVENT_CHOICE";
export const GET_HANGOUT="GET_HANGOUT";
export const GET_RESTAURANT="GET_RESTAURANT";
export const CHANGE_AUTH ="CHANGE_AUTH";
export const SET_FB_TOKEN="SET_FB_TOKEN"

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
  console.log('forms in updateProfile', forms)
  forms.dietary_restrictions[0]=forms.diet
  console.log('forms.age', forms.age)
let encodedURI = encodeURI('username=' + forms.username + 
          '&givenName=' + (forms.given_name || '') + '&familyName=' + (forms.family_name||'') + '&email=' + (forms.email || '') + '&age=' + (forms.age || '') + '&gender=' + (forms.gender || '') + '&biography=' + (forms.biography || ''));
        console.log('encodedURI', encodedURI)
        let xhr = new XMLHttpRequest();
        xhr.addEventListener('load', function(data) {
          console.log('Update Worked', data);
          console.log(data.target.response);
        });
        xhr.open('PUT', `${BASE_URL}user/${id}`);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(encodedURI);
  return ({
    type:UPDATE_PROFILE,
    payload: true
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
  const request = instance.post(`${BASE_URL}hangout/activity`)
  return({
    type: GET_EVENTS,
    payload: request
  })
}

export function sendEventChoice(id, choice){
var data = "user=" + id + "&activity=" + choice;
var xhr = new XMLHttpRequest();
xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    console.log('responseText', this.responseText);
  }
});

xhr.open("POST", "http://54.202.15.233:8000/api/hangout/");
xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

xhr.send(data);
  return({
    type:SEND_EVENT_CHOICE,
    payload: true
  })
}

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