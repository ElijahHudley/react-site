import { constants } from './actions';

const initialState = {
    items: []
}

export const repoReducer = (state = initialState, action) => {
    switch(action.type) {
        case constants.USER_LOGIN:
            return { ...state, ...action.payload }
        case constants.USER_LOGIN_SUCCESS:
            return { ...state, items: {...action.payload} }
        case constants.USER_CLEAR:
            return { ...action.payload }
        default:
            return state;
    }
}
