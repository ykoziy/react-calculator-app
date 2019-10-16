import {
  SHOW_HISTORY, CLEAR_HISTORY,
  SELECT_HISTORY_ITEM, PRESS_EQUALS,
  PRESS_CLEAR, PRESS_DIGIT,
  PRESS_DECIMAL, PRESS_OPERATION
} from "../constants/actionTypes.js";

export default (state, action) => {
  switch(action.type) {
    case CLEAR_HISTORY:
      return {...state, history: []};
    default:
      return state;
  }
};