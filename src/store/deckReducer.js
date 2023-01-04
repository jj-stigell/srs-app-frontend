import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  decks: []
};

//-----------------------|| DECK REDUCER ||-----------------------//

const accountSlice = createSlice({
  name: 'decks',
  initialState,
  reducers: {
    setDecks(state, action) {
      return action.payload;
    },
    // eslint-disable-next-line no-unused-vars
    resetDecks(state, action) {
      return initialState;
    }
  }
});

export const { setDecks, resetDecks } = accountSlice.actions;

export default accountSlice.reducer;
