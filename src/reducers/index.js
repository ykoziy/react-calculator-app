import {
  TOGGLE_HISTORY_VIEW, CLEAR_HISTORY,
  SELECT_HISTORY_ITEM, PRESS_EQUALS,
  PRESS_CLEAR, PRESS_DIGIT,
  PRESS_DECIMAL, PRESS_OPERATION
} from "../constants/actionTypes.js";

export default (state, action) => {
  switch(action.type) {
    case CLEAR_HISTORY:
      return {...state, history: []};
    case PRESS_DIGIT:
      return {...state, ...action.obj};
    case PRESS_CLEAR:
      return {...state, ...action.obj};
    case PRESS_OPERATION:
      return {...state, ...action.obj};
    case PRESS_DECIMAL:
      return {...state, ...action.obj};
    case PRESS_EQUALS:
      return {...state, ...action.obj};
    case TOGGLE_HISTORY_VIEW:
      return {...state, isHistoryView: !state.isHistoryView};
    case SELECT_HISTORY_ITEM:
      return {...state, ...action.obj};
    default:
      return state;
  }
};
