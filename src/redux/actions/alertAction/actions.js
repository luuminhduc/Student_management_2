import * as actions from './actionTypes';

export const addAlert = (alert) => {
    return{
        type: actions.ADD_ALERT,
        payload:alert
    }
}

export const hideAlert = (id) => {
    return{
        type:actions.HIDE_ALERT,
        payload:id,
    }
}

export const handleAlert = (alert) => dispatch => {
    const id = Math.random();
    dispatch(addAlert({...alert,id}));
    setTimeout(() => {
        dispatch(hideAlert(id));
    }, 6000)
}