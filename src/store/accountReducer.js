import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  isLoggedIn: false,
  isInitialized: false,
  account: null,
  verified: true,
  session: null,
  sessions: null
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
    setSessions(state, action) {
      return {
        ...state,
        sessions: action.payload
      };
    },
    removeSession(state, action) {
      return {
        ...state,
        sessions: state.sessions.filter(session => session.id !== action.payload)
      };
    },
    // eslint-disable-next-line no-unused-vars
    resetAccount(state, action) {
      return initialState;
    }
  }
});

export const { setAccount, resetAccount, setVerified, setSessions, removeSession } = accountSlice.actions;

export const logOutAccount = () => {
  return async (dispatch) => {
    dispatch(resetAccount(null));
    localStorage.removeItem('srs-token');
  };
};

export default accountSlice.reducer;
