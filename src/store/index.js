import { configureStore } from '@reduxjs/toolkit';

// reducer imports
import accountReducer from './accountReducer';
import customizationReducer from './customizationReducer';

//-----------------------|| CONFIGURE STORE WITH REDUCERS ||-----------------------//

export default configureStore({
  reducer: {
    account: accountReducer,
    customization: customizationReducer
  },
  // eslint-disable-next-line no-undef
  devTools: process.env.NODE_ENV !== 'production'
});

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
