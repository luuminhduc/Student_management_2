import * as actions from '../actions/loginAction/actionTypes';

const initialState = {
    loginUser:null,
    authError:null,
}

export default function loginReducer(state=initialState, action) {
    const {type, payload} = action;
    switch(type) {
        case actions.LOGIN_SUCCESS: return{...state,authError:null};
        case actions.LOGIN_FAILURE:return{...state, authError:payload};
        case actions.HIDE_AUTH_ERROR:return{...state,authError:null};
        case actions.GET_LOGIN_USER:return {...state, loginUser:payload}
        default: return state;
    }
}