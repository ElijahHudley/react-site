import { runSaga } from 'redux-saga';
import { put, all } from 'redux-saga/effects';

import { constants, login, loginSuccess, clear } from '../actions';
import { repositories } from '../../Repositories/actions';

import { userReducer } from '../reducers';
import { getUserSaga } from '../sagas';

const fakeToken = 'token';
const mockState = {
    token: fakeToken,
    isAuthenticated: false
};

describe('test user state actions', () => {
    test('should create a login action', () => {
        // const store = mockStore({ user: {token: fakeToken, isAuthenticated: false } })

        const expectedAction = {
            type: constants.USER_LOGIN,
            payload: {token: fakeToken}
        }

        expect(login(fakeToken)).toEqual(expectedAction)
    });

    test('should test login sucess user reducer', () => {
        const expectedState = {
            location: "Chicago",
            login: "ElijahHudley",
            name: "Elijah Hudley",
            isAuthenticated: true,
            token: fakeToken,
        };

        expect(userReducer(mockState,
            loginSuccess(fakeToken, {
                location: "Chicago",
                login: "ElijahHudley",
                name: "Elijah Hudley",
            })
        )).toEqual(expectedState);
    });

    test('should dispatch action "USER_LOGIN" with result from API', async () => {
        const action = {
            type: constants.USER_LOGIN,
            payload: {token: fakeToken}
        }

        const data = {
            location: "Chicago",
            login: "ElijahHudley",
            name: "Elijah Hudley",
            repos_url: 'fakeurl'
        };

        const saga = getUserSaga(action);
        saga.next();

        const actual = await saga.next(data).value;

        expect(actual).toEqual(
            all([
                put(loginSuccess(fakeToken, data)),
                put(repositories(data.repos_url))
            ])
        );
    });
});

