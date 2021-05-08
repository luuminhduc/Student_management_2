import * as actions from './actionTypes';

export const showLoading = () => {
    return{
        type: actions.SHOW_LOADING,
        payload: true
    }
}

export const hideLoading = () => {
    return{
        type: actions.HIDE_LOADING,
        payload: false
    }
}


export const showSearchBar = () => {
    return{
        type: actions.SHOW_SEARCH_BAR,
        payload: true
    }
}

export const hideSearchBar = () => {
    return{
        type: actions.HIDE_SEARCH_BAR,
        payload: false
    }
}

export const searchProduct = (term) => {
    return{
        type: actions.SEARCH_PRODUCT,
        payload:term,
    }
}
