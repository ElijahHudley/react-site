import { combineReducers, createStore, applyMiddleware } from 'redux';
import storage from 'redux-persist/lib/storage';

import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { persistStore, persistReducer } from 'redux-persist';

import { userReducer } from '../features/Login/reducers';
import { repoReducer } from '../features/Repositories/reducers';

import loginSaga from '../features/Login/sagas';
import repoSaga from '../features/Repositories/sagas';

const rootReducers = combineReducers({
  user: userReducer,
  repo: repoReducer,
});

const sagaMiddleware = createSagaMiddleware();


const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducers = persistReducer(persistConfig, rootReducers);
let store = createStore(persistedReducers, applyMiddleware(sagaMiddleware));

function* rootSaga() {
  yield all([
    loginSaga(),
    repoSaga()
  ]);
}

sagaMiddleware.run(rootSaga);


let persistor = persistStore(store);
export { store, persistor }

