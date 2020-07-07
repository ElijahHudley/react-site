export const constants = {
    USER_LOGIN: '@USER/USER_LOGIN',
    USER_LOGIN_SUCCESS: '@USER/USER_LOGIN_SUCCESS',
    USER_CLEAR:  '@USER/USER_CLEAR',
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
        payload: { ...data, isAuthenticated: true, token: token},
    };
}

export function clear() {
    return {
        type: constants.USER_CLEAR,
        payload: { isAuthenticated: false, token: '', data: {} }
    };
}
