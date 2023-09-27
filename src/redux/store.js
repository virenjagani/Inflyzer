//STORE.js  STORE.js  STORE.js  STORE.js STORE.js  STORE.js  STORE.js  STORE.js

import { combineReducers } from "redux";
import { authReducer, userReducer } from "./ducks/userReducer";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { watcherSaga } from "./sagas/rootSaga";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

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

const store = configureStore({
  reducer: persistReduce,
  middleware: [sagaMiddleware,logger],
});

sagaMiddleware.run(watcherSaga);
const persistor = persistStore(store);
export { store, persistor };
