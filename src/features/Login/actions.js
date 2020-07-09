export const constants = {
    USER_LOGIN: '@USER/USER_LOGIN',
    USER_LOGIN_SUCCESS: '@USER/USER_LOGIN_SUCCESS',
    USER_CLEAR:  '@USER/USER_CLEAR',
    USER_AUTHENICATE:  '@USER/USER_AUTHENTICATE',

}

export function login(token) {
    return {
        type: constants.USER_LOGIN,
        payload: {
            token,
        },
    };
}

export function loginSuccess(token, data) {
    return {
        type: constants.USER_LOGIN_SUCCESS,
        payload: { ...data, token: token },
    };
}

export function loginUserAuth(isAuthenticated) {
    return {
        type: constants.USER_AUTHENICATE,
        payload: { isAuthenticated }
    }
}

export function clear() {
    return {
        type: constants.USER_CLEAR,
        payload: { isAuthenticated: false, token: '', data: {} }
    };
}
