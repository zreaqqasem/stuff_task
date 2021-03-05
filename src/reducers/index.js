import {combineReducers} from 'redux';
import auth from './auth';
import dates from './dates';

export default combineReducers({
  auth,
  dates,
});
