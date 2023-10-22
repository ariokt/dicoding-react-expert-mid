const ActionType = {
  SET_LANG_IND: 'SET_LANG_IND',
  SET_LANG_ENG: 'SET_LANG_ENG',
};

function setLangIndActionCreator() {
  return {
    type: ActionType.SET_LANG_IND,
    payload: 'ind',
  };
}

function setLangEngActionCreator() {
  return {
    type: ActionType.SET_LANG_ENG,
    payload: 'eng',
  };
}

export {
  ActionType,
  setLangIndActionCreator,
  setLangEngActionCreator,
};
