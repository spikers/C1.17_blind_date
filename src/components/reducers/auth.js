import {CHANGE_AUTH} from '../actions'

export default function authentication (state=false, action){
  switch(action.type){
    case CHANGE_AUTH:
      return action.payload;
    default:
      return state;
  }
}