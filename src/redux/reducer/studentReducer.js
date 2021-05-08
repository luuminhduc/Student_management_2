import * as actions from '../actions/studentAction/actionTypes';

const initialState = {
    studentList: [],
    searchTerm: "",
    sortTerm: "a-z",
    filterTerm:"All",
    selectedStudent:null,
}

export default function studentReducer(state=initialState,action) {
    const {type,payload} = action;
    switch(type) {
        case actions.FETCH_STUDENT_LIST: return {...state,studentList:payload};
        case actions.SEARCH_STUDENT: return {...state,searchTerm:payload};
        case actions.SORTING_STUDENT: return {...state,sortTerm:payload};
        case actions.FILTERING_STUDENT:return{...state,filterTerm:payload};
        case actions.SELECT_STUDENT:case actions.DROP_STUDENT:return{...state,selectedStudent:payload};
        default: return state;
    }
}