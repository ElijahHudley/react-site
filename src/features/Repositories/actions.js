export const constants = {
    GET_REPOSITORIES: '@USER/GET_REPOSITORIES',
    GET_REPOSITORIES_SUCCESS: '@USER/GET_REPOSITORIES_SUCCESS',
}

export function repositories(url) {
    return {
        type: constants.GET_REPOSITORIES,
        payload: {
            url,
        },
    };
}

export function getRepositoriesSuccess(data) {
    return {
        type: constants.GET_REPOSITORIES_SUCCESS,
        payload: {
            ...data
        },
    };
}
