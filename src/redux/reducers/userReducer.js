import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    }
  }
});

export const { setUser } = userSlice.actions;

export const updateUser = () => {
  return async dispatch => {
    const updatedAnecdote = 'updated'; //update here
    dispatch(setUser(updatedAnecdote));
  };
};

export const logoutUser = () => {
  return async dispatch => {
    dispatch(setUser(null));
  };
};

export default userSlice.reducer;
