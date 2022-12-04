import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import loginSliceReducer from './LoginSlice';
import topNewsReducer from './TopNewsSlice';
import worldNewsReducer from './WorldNewsSlice';
import scienceNewsReducer from './ScienceNewsSlice';
import filterReducer from './FilterSlice';
;
const persistConfig = {
  key: 'root',
  storage: storage
};

const persistedReducer = persistReducer(persistConfig, loginSliceReducer);

export const store = configureStore({
  reducer: {
    authData: persistedReducer,
    topNews: topNewsReducer,
    worldNews: worldNewsReducer,
    scienceNews: scienceNewsReducer,
    filterData: filterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
})
export const persistor = persistStore(store)