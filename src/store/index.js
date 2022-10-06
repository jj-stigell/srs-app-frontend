import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

// reducer imports
import accountReducer from './accountReducer';
import customizationReducer from './customizationReducer';
import registerReducer from './registerReducer';

//-----------------------|| CONFIGURE STORE WITH REDUCERS ||-----------------------//

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['register']
};

const rootReducer = combineReducers({
  account: accountReducer,
  customization: customizationReducer,
  register: registerReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // eslint-disable-next-line no-undef
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
});

export const persistor = persistStore(store);
