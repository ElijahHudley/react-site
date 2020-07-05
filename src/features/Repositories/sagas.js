import { put, takeEvery, call } from 'redux-saga/effects';
import { constants, getRepositoriesSuccess } from './actions';

const getRequest = async (url) => {
    return await fetch(url).then((data) => data.json());
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

export default function* watchRepositories() {
    yield takeEvery(constants.GET_REPOSITORIES, getRepositoriesSaga);
}
