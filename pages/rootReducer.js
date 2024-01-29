import { combineReducers } from 'redux';
import cartReducer from './cartReducer'; // Assuming you have a separate file for cartReducer

const rootReducer = combineReducers({
  cart: cartReducer,
});

export default rootReducer;
