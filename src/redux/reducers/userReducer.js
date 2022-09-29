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
