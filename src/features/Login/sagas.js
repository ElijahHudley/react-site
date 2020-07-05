import { put, takeEvery, call } from 'redux-saga/effects';
import { constants, loginSuccess } from './actions';

const base = 'https://api.github.com';

const urls = {
    user: `${base}/user`,
    userRepos: `${base}/user/repos`,
}

const getRequest = async (token) => {
    return await fetch(urls.user, token ? {
        headers: {
            authorization: `token ${token}`
        }
    }: {}).then((data) => data.json());
}

export function* getUserSaga(action) {
    const token = action.payload.token;

    try {
        const data = yield call(getRequest, token);
        yield put(loginSuccess(data));
    } catch (err) {
        console.log(err);
    }
}

export default function* watchLogin() {
    yield takeEvery(constants.USER_LOGIN, getUserSaga);
}
