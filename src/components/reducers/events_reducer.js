import {GET_EVENTS} from '../actions/index'

const INITIAL_STATE = {
  events: null
};

export default function (state = INITIAL_STATE, action){
  switch(action.type){
    case GET_EVENTS:
      return{...state, events: action.payload};
    default:
      return state;
  }
}