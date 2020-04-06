// Actions
const CREATE = 'forecast/CREATE';
const UPDATE = 'forecast/UPDATE';

const defaultState = {};

// Reducers
const forecastReducer = (state = defaultState, action = {}) => {
  switch (action.type) {
    case CREATE:
      return { ...state, [action.city]: {} };
    case UPDATE:
      return { ...state, [action.city]: { ...action.forecast } };
  }

  return state;
};

export default forecastReducer;

// Action Creators
export const createCity = (city) => {
  return {
    type: CREATE,
    city,
  };
};

export const addCityForecast = (city, forecast) => {
  return {
    type: UPDATE,
    city,
    forecast,
  };
};
