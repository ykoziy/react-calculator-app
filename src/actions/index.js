import {
  SHOW_HISTORY, CLEAR_HISTORY,
  SELECT_HISTORY_ITEM, PRESS_EQUALS,
  PRESS_CLEAR, PRESS_DIGIT,
  PRESS_DECIMAL, PRESS_OPERATION
} from "../constants/actionTypes.js";

export const clearHistory = () => ({type: CLEAR_HISTORY});
export const pressDigit = (obj) => ({type: PRESS_DIGIT, obj});








