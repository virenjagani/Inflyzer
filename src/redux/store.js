//STORE.js  STORE.js  STORE.js  STORE.js STORE.js  STORE.js  STORE.js  STORE.js

import { combineReducers } from "redux";
import { authReducer, userReducer } from "./ducks/userReducer";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { watcherSaga } from "./sagas/rootSaga";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";


const sagaMiddleware = createSagaMiddleware();
const persistConfig = {
  key: "persist-key",
  storage,
};
const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
});

const persistReduce = persistReducer(persistConfig, rootReducer);
const getDefaultMiddlewares = getDefaultMiddleware({
  serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
  }
})
const store = configureStore({
  reducer: persistReduce,
  middleware: [sagaMiddleware,logger,...getDefaultMiddlewares],
});

sagaMiddleware.run(watcherSaga);
const persistor = persistStore(store);
export { store, persistor };
