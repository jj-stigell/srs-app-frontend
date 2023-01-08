/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cards: [],
  activeCard: null
};

//-----------------------|| CARD REDUCER ||-----------------------//

const cardSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setCards(state, action) {
      let cards = [], activeCard = null;
      [activeCard, ...cards] = action.payload;
      return {
        cards: cards,
        activeCard: activeCard
      };
    },
    resetCards(state, action) {
      return initialState;
    },
    setActiveCard(state, action) {
      return action.payload;
    }
  }
});

export const { setCards, resetCards, setActiveCard } = cardSlice.actions;

export default cardSlice.reducer;
