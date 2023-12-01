import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {persistReducer, persistStore} from 'redux-persist';
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";
import storage from 'redux-persist/lib/storage';
import {createStateSyncMiddleware, initMessageListener} from "redux-state-sync";
import {apiSlice} from './api.ts';
import {persistReducerBlacklist, reducers, syncActionBlacklist} from './reducers.ts';

const persistActions: string[] = [
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
];
const persistConfig = {
  key: 'root',
  storage,
  blacklist: persistReducerBlacklist.concat(apiSlice.reducerPath),
};
const syncConfig = {
  blacklist: persistActions.concat(...syncActionBlacklist),
}

const combinedReducer = combineReducers({
  ...reducers,
  [apiSlice.reducerPath]: apiSlice.reducer,
});
const persistedReducer = persistReducer(persistConfig, combinedReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: persistActions
      }
    })
      .concat(
        apiSlice.middleware,
        createStateSyncMiddleware(syncConfig)
      )
  )
});

initMessageListener(store);

export const persistor = persistStore(store);
