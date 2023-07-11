import {configureStore, combineReducers} from "@reduxjs/toolkit";
import studentReducer from "./studentSlice";
import mentorReducer from "./mentorSlice";
import staffReducer from "./staffSlice";
import instrutorReducer from "./instructorSlice";
import {
    persistStore, persistReducer,FLUSH,
    REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {PersistGate} from 'redux-persist/integration/react'

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }

  const rootReducer = combineReducers({
    student:studentReducer,
    instrutor:instrutorReducer,
    staff:staffReducer,
    mentor:mentorReducer
})
  const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
  reducer:persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  
})

 export let persistor = persistStore(store);


