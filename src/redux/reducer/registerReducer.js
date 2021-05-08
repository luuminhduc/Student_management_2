import * as actions from '../actions/registerAction/actionTypes';

const initialState = {
    authError :"",
} 

export default function registerReducer(state=initialState, action) {
    const{type, payload} = action;
    switch(type) {
        case actions.REGISTER_SUCCESS: return{...state, authError:null};
        case actions.REGISTER_ERROR:return{...state, authError:payload};
        case actions.REMOVE_AUTH_ERROR:return{...state, authError:null};
        default: return state;
    }
}