import { combineReducers } from 'redux';
import authReducer         from './authReducer';
import userReducer         from './userReducer';
import alertasReducer      from './alertasReducer';


export default combineReducers({
    auth  : authReducer,
    user  : userReducer,
    alerta: alertasReducer 
});