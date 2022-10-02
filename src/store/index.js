//import { combineReducers } from 'redux';
//import { persistReducer } from 'redux-persist';
//import storage from 'redux-persist/lib/storage';
import { configureStore } from '@reduxjs/toolkit';

// reducer import
//import customizationReducer from './customizationReducer';
import accountReducer from './accountReducer';
import customizationReducer from './customizationReducer';

//-----------------------|| COMBINE REDUCER ||-----------------------//
export default configureStore({
  reducer: {
    account: accountReducer,
    customization: customizationReducer
  }
});

/*
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
