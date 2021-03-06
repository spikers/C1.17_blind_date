import {GET_PROFILE, GET_SECOND_PROFILE, SEND_LOGIN, GET_RESTAURANT, SET_FB_TOKEN, UPDATE_PROFILE, SET_GEOLOCATION} from '../actions/index';

const INITIAL_STATE = {
  user: null
};

export default function (state = INITIAL_STATE, action){
  switch(action.type){
    case GET_PROFILE:
      return{...state, user: action.payload.data}
    case GET_SECOND_PROFILE:
      return{...state, secondUser: action.payload && action.payload.data}
    case GET_RESTAURANT:
      return{...state, restaurant: action.payload.data}
    case SET_FB_TOKEN:
      return{...state, token: action.payload}
    case UPDATE_PROFILE:
      return{...state, user: action.payload}
    case SET_GEOLOCATION:
      return{...state, geolocation: action.payload}
    default:
      return state;
  }
}