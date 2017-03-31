import {GET_EVENTS, SET_EVENT_CHOICE, CHECK_IN_NOTIFICATION} from '../actions/index'

const INITIAL_STATE = {
  events: null,
  checkIn: false
};

export default function (state = INITIAL_STATE, action){
  switch(action.type){
    case GET_EVENTS:
      return{...state, events: action.payload};
    case SET_EVENT_CHOICE:
      return {...state, eventChoice: action.payload}
    case CHECK_IN_NOTIFICATION:
      return {...state, checkIn: action.payload}
    default:
      return state;
  }
}