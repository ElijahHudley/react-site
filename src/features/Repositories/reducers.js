import { constants } from './actions';

const initialState = {
    items: [],
    selected: {},
}

export const repoReducer = (state = initialState, action) => {
    switch(action.type) {
        case constants.GET_ISSUES_SUCCESS:
            return { ...state, selected: { ...state.selected, ...action.payload } }
        case constants.GET_REPOSITORIES:
            return { ...state, ...action.payload }
        case constants.GET_REPOSITORIES_SUCCESS:
            return { ...state, items: {...action.payload} }
        case constants.UPDATE_ISSUES_SUCCESS:
            return { ...state, selected: {...state.selected, ...action.payload } }
        default:
            return state;
    }
}
