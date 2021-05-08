import {combineReducers} from 'redux';
import {firebaseReducer} from 'react-redux-firebase';
import alertReducer from './alertReducer';
import loginReducer from './loginReducer';
import registerReducer from './registerReducer';
import commonReducer from './commonReducer';
import classReducer from './classReducer';
import studentReducer from './studentReducer';
import modalReducer from './modalReducer';
export default combineReducers({
    firebaseReducer,
    alertReducer,
    loginReducer,
    registerReducer,
    commonReducer,
    classReducer,
    studentReducer,
    modalReducer
})