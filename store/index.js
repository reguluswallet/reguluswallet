import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import {RootNavigationMiddleware} from '../navigation/RootNavigation';
import reducers from '../reducers';

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['nav']
};

const persistedReducer = persistReducer(persistConfig, reducers);

let store = createStore(persistedReducer, applyMiddleware(ReduxThunk, RootNavigationMiddleware));
let persistor = persistStore(store);

export {store, persistor};