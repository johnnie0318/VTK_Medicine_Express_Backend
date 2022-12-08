import { combineReducers } from 'redux';
import countReducer from './reducers';

const rootReducer = combineReducers({ countReducer });

export default rootReducer;
