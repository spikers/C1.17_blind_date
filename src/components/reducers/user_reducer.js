import {GET_PROFILE} from '../actions/index'

const INITIAL_STATE = {
  user: null
};

export default function (state = INITIAL_STATE, action){
  switch(action.type){
    case GET_PROFILE:
      return{...state, user: action.payload};
    default:
      return state;
  }
}