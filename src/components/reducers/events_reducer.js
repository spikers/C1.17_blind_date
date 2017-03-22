import {GET_EVENTS, SET_EVENT_CHOICE} from '../actions/index'

const INITIAL_STATE = {
  events: null
};

export default function (state = INITIAL_STATE, action){
  switch(action.type){
    case GET_EVENTS:
      return{...state, events: action.payload};
    case SET_EVENT_CHOICE:
      return {...state, eventChoice: action.payload}
    default:
      return state;
  }
}