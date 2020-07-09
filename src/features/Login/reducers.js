import { constants } from './actions';

const initialState = {
    isAuthenticated: false,
    token: '',
}

export const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case constants.USER_LOGIN:
            return { ...state, ...action.payload }
        case constants.USER_LOGIN_SUCCESS:
            return { ...state, ...action.payload }
        case constants.USER_CLEAR:
            return { ...action.payload }
        case constants.USER_AUTHENICATE:
            return { ...state, ...action.payload }
        default:
            return state;
    }
}
