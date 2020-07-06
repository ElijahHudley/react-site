export const constants = {
    GET_REPOSITORIES: '@USER/GET_REPOSITORIES',
    GET_REPOSITORIES_SUCCESS: '@USER/GET_REPOSITORIES_SUCCESS',
    GET_ISSUES: '@USER/GET_ISSUES',
    UPDATE_ISSUES: '@USER/UPDATE_ISSUES',
    UPDATE_ISSUES_SUCCESS: '@USER/UPDATE_ISSUES_SUCCESS',
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

export function getIssues(id, url) {
    return {
        type: constants.GET_ISSUES,
        payload: {
            url,
            id,
        },
    };
}

export function updateIssues(id, value) {
    return {
        type: constants.UPDATE_ISSUES,
        payload: {
            id, value
        },
    };
}

export function updateIssueSuccess(issue) {
    return {
        type: constants.UPDATE_ISSUES_SUCCESS,
        payload: {
            ...issue,
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
