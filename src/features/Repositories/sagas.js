import { put, takeEvery, call, select } from 'redux-saga/effects';
import { constants, getRepositoriesSuccess, getIssuesSuccess, updateIssueSuccess } from './actions';

const getRequest = async (url, token) => {
    return await fetch(`${url}`, {headers: {authorization: `token ${token}`}}).then((data) => data.json());
}

export function* getRepositoriesSaga(action) {
    const url = action.payload.url;
    const state = yield select();

    try {
        const data = yield call(getRequest, url, state.user.token);
        yield put(getRepositoriesSuccess(data));
    } catch (err) {
        console.log(err);
    }
}

export function* getIssuesSaga(action) {
    const url = action.payload.url;
    const id = action.payload.id;

    const state = yield select();

    try {
        const data = yield call(getRequest, `${url}/issues?sort=created?direction=desc`, state.user.token);
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
