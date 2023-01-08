import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

// reducer imports
import accountReducer from './accountReducer';
import customizationReducer from './customizationReducer';
import registerReducer from './registerReducer';
import rememberMeReducer from './rememberMeReducer';
import deckReducer from './deckReducer';
import cardSlice from './cardReducer';

//-----------------------|| CONFIGURE STORE WITH REDUCERS ||-----------------------//

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['register']
};

const rootReducer = combineReducers({
  account: accountReducer,
  customization: customizationReducer,
  register: registerReducer,
  remember: rememberMeReducer,
  decks: deckReducer,
  cards: cardSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // eslint-disable-next-line no-undef
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
});

export const persistor = persistStore(store);
