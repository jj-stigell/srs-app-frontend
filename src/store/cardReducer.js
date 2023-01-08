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
      let cards = action.payload, activeCard = null;
      if (cards.length > 0) {
        activeCard = cards.shift();
      }
      return {
        cards: cards,
        activeCard: activeCard
      };
    },
    resetCards(state, action) {
      return initialState;
    },
    setActiveCard(state, action) {
      /*
      // take the next card from all the cards and set as active card, remove that from cards
      let cards = state.cards, activeCard = null;
      if (cards.length > 0) {
        activeCard = cards.shift();
      }

      return {
        cards: cards,
        activeCard: activeCard
      };
      */

      return action.payload;
    }
  }
});

export const { setCards, resetCards, setActiveCard } = cardSlice.actions;

export default cardSlice.reducer;