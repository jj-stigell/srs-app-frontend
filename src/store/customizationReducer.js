import { createSlice } from '@reduxjs/toolkit';
import config from '../config';

const initialState = {
  isOpen: [], //for active default menu
  fontFamily: config.fontFamily,
  borderRadius: config.borderRadius,
  opened: true
};

//-----------------------|| CUSTOMIZATION REDUCER ||-----------------------//

const customizationSlice = createSlice({
  name: 'customization',
  initialState,
  reducers: {
    menuOpen(state, action) {
      //const id = action.id;
      return {
        ...state,
        isOpen: [action.payload]
      };
    },
    setMenu(state, action) {
      return {
        ...state,
        opened: action.payload
      };
    },
    setFontFamily(state, action) {
      return {
        ...state,
        fontFamily: action.payload
      };
    },
    setBorderRadius(state, action) {
      return {
        ...state,
        borderRadius: action.payload
      };
    }
  }
});

export const { menuOpen, setMenu, setFontFamily, setBorderRadius } = customizationSlice.actions;

export default customizationSlice.reducer;
