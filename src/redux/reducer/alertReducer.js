import * as actions from '../actions/alertAction/actionTypes';

const initialState = {
    alertList: [
    //     {
    //     text:"Ngu",
    //     status:"success",
    //     id:1
    // }
    //,{
    //     text:"Ngu",
    //     status:"error",
    //     id:2
    // },{
    //     text:"Ngu",
    //     status:"warning",
    //     id:3
    // },{
    //     text:"Ngu",
    //     status:"info",
    //     id:4
    // }
],
}

export default function alertReducer(state=initialState, action){
    const {type, payload} = action;
    switch(type) {
        case actions.ADD_ALERT: return{...state,alertList:[...state.alertList, payload]};
        case actions.HIDE_ALERT:return{...state,alertList:[...state.alertList].filter(el => el.id !== payload)};
        default: return state;
    }
}