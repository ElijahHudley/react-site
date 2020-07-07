import { put, takeEvery, call, all } from 'redux-saga/effects';
import { constants, loginSuccess } from './actions';
import { repositories } from '../Repositories/actions';
const base = 'https://api.github.com';

const urls = {
    user: `${base}/user`,
    userRepos: `${base}/user/repos`,
}

export const getRequest = async (token) => {
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
        yield all([
            put(loginSuccess(token, data)),
            put(repositories(data.repos_url))
        ]);
    } catch (err) {
        console.log(err);
    }
}

export default function* watchLogin() {
    yield takeEvery(constants.USER_LOGIN, getUserSaga);
}
