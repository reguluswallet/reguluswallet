import { applyMiddleware, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import createSecureStore from "redux-persist-expo-securestore";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { RootNavigationMiddleware } from "../navigation/RootNavigation";
import reducers from "../reducers";

// Secure storage
const storage = createSecureStore();

const persistConfig = {
    key: "root",
    storage,
    blacklist: ["nav"]
};

const persistedReducer = persistReducer(persistConfig, reducers);

let store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(ReduxThunk, RootNavigationMiddleware))
);

let persistor = persistStore(store);

export { store, persistor };
