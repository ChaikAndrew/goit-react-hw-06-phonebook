import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import contactReducer from './contacts';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const contactsPersistConfig = {
  key: 'contacts',
  storage: storage,
  blacklist: ['filter'],
};

export const store = configureStore({
  reducer: {
    contacts: persistReducer(contactsPersistConfig, contactReducer),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
