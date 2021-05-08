import * as actions from '../actions/commonAction/actionTypes';

const initialState = {
    loading:false,
    searchBar:false,
    searchProductTerm:"",
}

export default function commonReducer(state=initialState, action) {
    const {type, payload} = action;
    switch(type){
        case actions.SHOW_LOADING:case actions.HIDE_LOADING:return{...state,loading:payload}
        case actions.SHOW_SEARCH_BAR:case actions.HIDE_SEARCH_BAR:return{...state,searchBar:payload}
        case actions.SEARCH_PRODUCT:return{...state,searchProductTerm:payload};
        default: return state;
    }
}