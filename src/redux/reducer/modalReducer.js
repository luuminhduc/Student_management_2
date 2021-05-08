import * as actions from '../actions/modalAction/actionTypes';

const initalState = {
    title: "",
    text:"",
    callbackAction:null
}

export default function modalReducer(state=initalState, action) {
    const {payload,type} = action;
    switch(type) {
        case actions.HIDE_MODAL: return initalState;
        case actions.SHOW_MODAL: {
            const {title,text,callbackAction} = payload;
            
            return {title,text,callbackAction}
        }
        default: return state;
    }
}