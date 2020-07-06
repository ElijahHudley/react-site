import { put, takeEvery, call } from 'redux-saga/effects';
import { constants, getRepositoriesSuccess, getIssuesSuccess, updateIssueSuccess } from './actions';

const getRequest = async (url) => {
    return await fetch(`${url}`, {headers: {authorization: 'token 444dc33e69751b67df88bda742ad384dc2622634'}}).then((data) => data.json());
}

const patchRequest = async (url) => {
    return await fetch(`${url}`, {
        method: 'PATCH',
        headers: {authorization: 'token 444dc33e69751b67df88bda742ad384dc2622634'}
    }).then((data) => data.json());
}

export function* getRepositoriesSaga(action) {
    const url = action.payload.url;

    try {
        const data = yield call(getRequest, url);
        yield put(getRepositoriesSuccess(data));
    } catch (err) {
        console.log(err);
    }
}

export function* getIssuesSaga(action) {
    const url = action.payload.url;
    const id = action.payload.id;

    try {
        const data = yield call(getRequest, `${url}/issues?sort=created?direction=desc`);
        yield put(getIssuesSuccess({ [id]: data }));
    } catch (err) {
        console.log(err);
    }
}

export function* updateIssuesSaga(action) {
    const id = action.payload.id;
    const value = action.payload.value;

    try {
        yield put(updateIssueSuccess({[id]: value }));
    } catch (err) {
        console.log(err);
    }
}

export default function* watchRepositories() {
    yield takeEvery(constants.GET_REPOSITORIES, getRepositoriesSaga);
    yield takeEvery(constants.GET_ISSUES, getIssuesSaga);
    yield takeEvery(constants.UPDATE_ISSUES, updateIssuesSaga);

}
