import { handleAlert } from '../alertAction/actions';
import { hideLoading, showLoading } from '../commonAction/actions';
import * as actions from './actionTypes';

export const loginRequest = (user,history) => (dispatch, getState, {getFirebase, getFirestore}) => {
    dispatch(showLoading());
    const firebase = getFirebase();
    const firestore = getFirestore();
    firebase.auth().signInWithEmailAndPassword(
        user.email,user.password
    ).then((doc) => {
        history.push('/');
        dispatch(handleAlert({text:"You are now log in",status:"success"}))
        dispatch(hideLoading());
        dispatch({
                        type: actions.LOGIN_SUCCESS,
                    })
    }).catch(err => {
        dispatch(hideLoading());
        dispatch({
            type: actions.LOGIN_FAILURE,
            payload:err.message,
        })
    })
}

export const logout = () => (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    firebase.auth().signOut().then(() => {
        dispatch(handleAlert({text:"You are now log out", status:"success"}))
        dispatch({
            type: actions.LOG_OUT,
        })
    }).catch(err => {
        console.log(err);
    })
}

export const getLoginUser = (uid) => (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('users')
    .doc(uid)
    .get()
    .then(doc => {
        if(doc.exists) {
            dispatch({
                type: actions.GET_LOGIN_USER,
                payload:{...doc.data(),uid:doc.id},
            })
        }
    })
    .catch(err => {
        console.log(err);
    })
}

export const hideAuthError = () => {
    return{
        type: actions.HIDE_AUTH_ERROR,
        payload:null,
    }
}
