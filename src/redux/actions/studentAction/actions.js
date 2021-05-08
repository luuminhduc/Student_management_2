import { handleAlert } from '../alertAction/actions';
import * as actions from './actionTypes';

export const addNewStudent = (newStudent, history,uid) => (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('students').add(newStudent)
    .then(() => {
        history.push('/');
        dispatch(handleAlert({text:"New student is added", status:"success"}));
        dispatch(fetchStudentList(uid))
    })
    .catch(err=> dispatch(handleAlert({text:err.message,status:"error"})))
}

export const updateStudent = (student, history) => (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    const { name, className, math, literature, english,id,uid } = student;
    console.log(math);
    firestore.collection('students').doc(id).set({
        name,
        className,
        math:+math,
        literature:+literature,
        english:+english,
        uid
    })
    .then(() => {
        history.push('/');
        dispatch(handleAlert({text:"Student is updated", status:"success"}));
        dispatch(dropStudent())

    })
    .catch(err=> dispatch(handleAlert({text:err.message,status:"error"})))
}

export const fetchStudentList = (uid) => (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('students').where("uid", "==",uid).get()
    .then(snap => {
        const docs = [];
        snap.forEach(doc => {
            docs.push({...doc.data(), id:doc.id});
        })
        dispatch({
            type: actions.FETCH_STUDENT_LIST,
            payload: docs,
        })
    })
    .catch(err => {
        dispatch(handleAlert({text: err.message, status:"error"}));
    })
}

export const deleteStudent = (id,uid,show) => (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('students').doc(id).delete()
    .then(() => {
        if(show)         dispatch(handleAlert({text: "A student is deleted", status:"success"}));

        dispatch(fetchStudentList(uid))
    })
    .catch(err => {
        dispatch(handleAlert({text: err.message, status:"error"}));
    })
}

export const searchStudent = (term) => {
    return{
        type: actions.SEARCH_STUDENT,
        payload: term,
    }
}

export const sortingStudent = (term) => {
    return{
        type: actions.SORTING_STUDENT,
        payload: term,
    }
}

export const filteringStudent = (term) => {
    return{
        type: actions.FILTERING_STUDENT,
        payload: term,
    }
}


export const selectStudent = (student) => {
    return{
        type: actions.SELECT_STUDENT,
        payload: student,
    }
}

export const dropStudent = () => {
    return{
        type: actions.SELECT_STUDENT,
        payload:null
    }
}
