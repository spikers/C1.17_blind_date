import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import userReducer from './user_reducer';
import eventReducer from './events_reducer';
import authReducer from './auth';

const rootReducer = combineReducers({
  user: userReducer,
  form: formReducer,
  events: eventReducer,
  authenticated: authReducer
})

export default rootReducer;