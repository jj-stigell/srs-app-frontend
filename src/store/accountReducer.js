// action - state management
//import { ACCOUNT_INITIALIZE, LOGIN, LOGOUT } from './actions';

import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  token: null,
  isLoggedIn: false,
  isInitialized: false,
  user: null
};

//-----------------------|| ACCOUNT REDUCER ||-----------------------//

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccount(state, action) {
      return action.payload;
    },
    resetAccount(state, action) {
      return action.payload;
    }
  }
});

export const { setAccount, resetAccount } = accountSlice.actions;

export const logoutUser = () => {
  return async dispatch => {
    dispatch(resetAccount(null));
  };
};

export default accountSlice.reducer;


/*
const accountReducer = (state = initialState, action) => {
  switch (action.type) {
  case ACCOUNT_INITIALIZE: {
    const { isLoggedIn, user, token } = action.payload;
    return {
      ...state,
      isLoggedIn,
      isInitialized: true,
      token,
      user
    };
  }
  case LOGIN: {
    const { user } = action.payload;
    return {
      ...state,
      isLoggedIn: true,
      user
    };
  }
  case LOGOUT: {
    return {
      ...state,
      isLoggedIn: false,
      token: '',
      user: null
    };
  }
  default: {
    return { ...state };
  }
  }
};

export default accountReducer;
*/

/*

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    }
  }
});

export const { setUser, setToken } = userSlice.actions;

export const updateUser = () => {
  return async dispatch => {
    const updatedAnecdote = 'updated'; //update here
    dispatch(setUser(updatedAnecdote));
  };
};

export const logoutUser = () => {
  return async dispatch => {
    dispatch(setUser(null));
    dispatch(setToken(null));
  };
};

export default userSlice.reducer;







-------

// action - state management
import { ACCOUNT_INITIALIZE, LOGIN, LOGOUT } from './actions';

export const initialState = {
  token: '',
  isLoggedIn: false,
  isInitialized: false,
  user: null
};

//-----------------------|| ACCOUNT REDUCER ||-----------------------//

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
  case ACCOUNT_INITIALIZE: {
    const { isLoggedIn, user, token } = action.payload;
    return {
      ...state,
      isLoggedIn,
      isInitialized: true,
      token,
      user
    };
  }
  case LOGIN: {
    const { user } = action.payload;
    return {
      ...state,
      isLoggedIn: true,
      user
    };
  }
  case LOGOUT: {
    return {
      ...state,
      isLoggedIn: false,
      token: '',
      user: null
    };
  }
  default: {
    return { ...state };
  }
  }
};

export default accountReducer;

*/