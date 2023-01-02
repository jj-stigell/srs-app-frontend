import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: null,
  password: null
};

//-----------------------|| REMEMBER ME REDUCER ||-----------------------//

const rememberSlice = createSlice({
  name: 'remember',
  initialState,
  reducers: {
    setRememberMe(state, action) {
      return action.payload;
    },
    // eslint-disable-next-line no-unused-vars
    resetRememberMe(state, action) {
      return initialState;
    }
  }
});

export const { setRememberMe, resetRememberMe } = rememberSlice.actions;

export default rememberSlice.reducer;
