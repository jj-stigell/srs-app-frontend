import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: [],
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

export default userSlice.reducer;
