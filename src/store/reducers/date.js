// Actions
const SET = 'date/SET';
const CLEAR = 'date/CLEAR';

const defaultState = null;

// Reducers
const dateReducer = (state = defaultState, action = {}) => {
  switch (action.type) {
    case SET:
      return action.date;
    case CLEAR:
      return null;
  }

  return state;
};

export default dateReducer;

// Action Creators
export const setDate = (date) => {
  return {
    type: SET,
    date,
  };
};

export const clearSession = () => {
  return {
    type: CLEAR,
  };
};
