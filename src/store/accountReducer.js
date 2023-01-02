// action - state management
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  isLoggedIn: false,
  isInitialized: false,
  user: null,
  verified: true
};

//-----------------------|| ACCOUNT REDUCER ||-----------------------//

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccount(state, action) {
      return action.payload;
    },
    setVerified(state, action) {
      return {
        ...state,
        verified: action.payload
      };
    },
    // eslint-disable-next-line no-unused-vars
    resetAccount(state, action) {
      return initialState;
    }
  }
});

export const { setAccount, resetAccount, setVerified } = accountSlice.actions;

export const logOutAccount = () => {
  return async dispatch => {
    dispatch(resetAccount(null));
  };
};

export default accountSlice.reducer;
