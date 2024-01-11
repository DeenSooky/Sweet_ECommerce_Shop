import { combineReducers } from 'redux';
import authReducer from '../redux/userReducer';
import store from '../redux/store'; 

const rootReducer = combineReducers({
  auth: authReducer,
  cart: store,
});

export default rootReducer;