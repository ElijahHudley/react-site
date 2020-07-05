export const constants = {
    GET_REPOSITORIES: '@USER/GET_REPOSITORIES',
    GET_REPOSITORIES_SUCCESS: '@USER/GET_REPOSITORIES_SUCCESS',
    GET_ISSUES: '@USER/GET_ISSUES',
    GET_ISSUES_SUCCESS: '@USER/GET_ISSUES_SUCCESS',
}

export function repositories(url) {
    return {
        type: constants.GET_REPOSITORIES,
        payload: {
            url,
        },
    };
}

export function getIssues(url) {
    return {
        type: constants.GET_ISSUES,
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

export function getIssuesSuccess(data) {
    return {
        type: constants.GET_ISSUES_SUCCESS,
        payload: {
            ...data
        },
    };
}
