import { handleAlert } from '../alertAction/actions';
import * as actions from './actionsTypes';

export const addNewClass = (newClass, history,uid) => (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('classes').add(newClass).then(() => {
        history.push('/');
        dispatch(handleAlert({text:"New class is added", status:"success"}));
        dispatch(fetchAllClasses(uid))
    }).catch(err => {
        dispatch(handleAlert({text: err.message,status:"error"}))
    })    
}

export const deleteClass = (classId,history,uid) => (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
  
    firestore.collection('classes').doc(classId).delete()
    .then(() => {
        dispatch(handleAlert({text:"A class is deleted", status:"success"}));
        dispatch(fetchAllClasses(uid))
        history.push('/');
    })
    .catch(err => {
        dispatch(handleAlert({text:err.message, status:"error"}));
    })
}

export const fetchAllClasses = (uid) => (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('classes').where("uid","==",uid).get().then(snap => {
        const docs = [];
        snap.forEach(doc => docs.push({...doc.data(),id:doc.id}));
        dispatch({
            type: actions.FETCH_ALL_CLASSES,
            payload: docs,
        })
    })
}

export const searchingClass = (term) => {
    return{
        type: actions.SEARCHING_CLASS,
        payload:term,
    }
}