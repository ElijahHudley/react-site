import { put, takeEvery, call } from 'redux-saga/effects';
import { constants, getRepositoriesSuccess, getIssuesSuccess } from './actions';

const getRequest = async (url) => {
    return await fetch(`${url}`, {headers: {authorization: 'token 84b9d5789215bec3ef9541cdb1ccc8c6bcbcb82f'}}).then((data) => data.json());
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

    try {
        const data = yield call(getRequest, `${url}/issues?sort=created?direction=desc`);
        console.log('getRequest', data)
        yield put(getIssuesSuccess(data));
    } catch (err) {
        console.log(err);
    }
}

export default function* watchRepositories() {
    yield takeEvery(constants.GET_REPOSITORIES, getRepositoriesSaga);
    yield takeEvery(constants.GET_ISSUES, getIssuesSaga);

}
