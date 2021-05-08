import * as actions from './actionTypes';

export const hideModal = () => {
    return{
        type: actions.HIDE_MODAL,
    }
}

export const showModal = (modal) => {
    return{
        type: actions.SHOW_MODAL,
        payload:modal
    }
}