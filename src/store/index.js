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

/*
//import { combineReducers } from 'redux';
//import { persistReducer } from 'redux-persist';
//import storage from 'redux-persist/lib/storage';

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';

export default configureStore({
  reducer: {
    user: userReducer,
  }
});



const reducer = combineReducers({
  account: persistReducer(
    {
      key: 'account',
      storage,
      keyPrefix: 'berry-'
    },
    accountReducer
  ),
  customization: customizationReducer
});

export default reducer;

*/
