import * as actions from '../actions/classAction/actionsTypes';

const initialState = {
    classList: [],
    classSearchTerm:"",
}

export default function classReducer (state=initialState, action) {
    const {type, payload} = action;
    switch(type) {
        case actions.FETCH_ALL_CLASSES: return {...state,classList:payload};
        case actions.SEARCHING_CLASS: return{...state,classSearchTerm:payload};
        default: return state;
    }
}