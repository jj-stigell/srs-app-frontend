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

/*
// project imports
import config from '../config';

// action - state management
import * as actionTypes from './actions';

export const initialState = {
  isOpen: [], //for active default menu
  fontFamily: config.fontFamily,
  borderRadius: config.borderRadius,
  opened: true
};

//-----------------------|| CUSTOMIZATION REDUCER ||-----------------------//

const customizationReducer = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.MENU_OPEN:
    // eslint-disable-next-line no-case-declarations
    const id = action.id;
    return {
      ...state,
      isOpen: [id]
    };
  case actionTypes.SET_MENU:
    return {
      ...state,
      opened: action.opened
    };
  case actionTypes.SET_FONT_FAMILY:
    return {
      ...state,
      fontFamily: action.fontFamily
    };
  case actionTypes.SET_BORDER_RADIUS:
    return {
      ...state,
      borderRadius: action.borderRadius
    };
  default:
    return state;
  }
};

export default customizationReducer;
*/