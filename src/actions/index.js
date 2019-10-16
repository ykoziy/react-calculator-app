import {
  TOGGLE_HISTORY_VIEW, CLEAR_HISTORY,
  SELECT_HISTORY_ITEM, PRESS_EQUALS,
  PRESS_CLEAR, PRESS_DIGIT,
  PRESS_DECIMAL, PRESS_OPERATION
} from "../constants/actionTypes.js";

export const clearHistory = () => ({type: CLEAR_HISTORY});
export const pressDigit = (obj) => ({type: PRESS_DIGIT, obj});
export const pressEquals = (obj) => ({type: PRESS_EQUALS, obj});
export const pressDecimal = (obj) => ({type: PRESS_DECIMAL, obj});
export const pressOperation = (obj) => ({type: PRESS_OPERATION, obj});
export const pressClear = (obj) => ({type: PRESS_CLEAR, obj});
export const toggleHistoryView = () => ({type: TOGGLE_HISTORY_VIEW});
export const selectHistoryItem = (obj) => ({type: SELECT_HISTORY_ITEM, obj});
