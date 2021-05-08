import { handleAlert } from '../alertAction/actions';
import {  hideLoading, showLoading } from '../commonAction/actions';
import * as actions from './actionTypes';

export const registerRequest = (user, history) => (dispatch, getState, {getFirebase, getFirestore}) => {
    dispatch(showLoading());
    const firebase = getFirebase();
    const firestore = getFirestore();
    firebase.auth().createUserWithEmailAndPassword(
        user.email,
        user.password,
    ).then(res => {
        firestore.collection("users").doc(res.user.uid).set({
            email:user.email,
            firstName:'',
        lastName:'',
        street:'',
        city:'',
        state:'',
        zipCode:'',
        country:'',  
        phoneNumber:'',
        })
    }).then(() => {
        dispatch({
            type: actions.REGISTER_SUCCESS,
        })
        dispatch(handleAlert({text:"Register is done, you are now login",status:"success"}));
        dispatch(hideLoading());
        if(history) history.push('/');
    }).catch(err => {
        dispatch({
            type: actions.REGISTER_ERROR,
            payload: err.message
        })
        dispatch(hideLoading());
    })
}

export const hideAuthError = () => {
    return{
        type: actions.REMOVE_AUTH_ERROR,
    }
}


