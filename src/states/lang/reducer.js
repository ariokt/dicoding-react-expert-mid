import { ActionType } from './action';

function langReducer(lang = localStorage.getItem('lang') || 'ind', action = {}) {
  switch (action.type) {
    case ActionType.SET_LANG_IND:
      localStorage.setItem('lang', action.payload);
      return action.payload;
    case ActionType.SET_LANG_ENG:
      localStorage.setItem('lang', action.payload);
      return action.payload;
    default:
      return lang;
  }
}

export default langReducer;
