// Actions
const CREATE = 'reminder/CREATE';
const UPDATE = 'reminder/UPDATE';
const DELETE = 'reminder/DELETE';
const DELETE_ALL = 'reminder/DELETE_ALL';

const defaultState = {};

// Reducers
const remindersReducer = (state = defaultState, action = {}) => {
  switch (action.type) {
    case CREATE:
      if (!state[action.key]) {
        state[action.key] = [action.reminder];
      } else {
        state[action.key] = [...state[action.key], action.reminder];
      }
      return state;
    case UPDATE:
      return action.reminder;
    case DELETE:
      return null;
    case DELETE_ALL:
      return null;
  }

  return state;
};

export default remindersReducer;

// Action Creators
export const createReminder = (key, reminder) => {
  return {
    type: CREATE,
    reminder,
    key,
  };
};

export const updateReminder = (key, reminder) => {
  return {
    type: UPDATE,
    reminder,
    key,
  };
};

export const deleteReminder = (key, reminder) => {
  return {
    type: DELETE,
    reminder,
    key,
  };
};

export const deleteAllReminders = (key) => {
  return {
    type: DELETE_ALL,
    key,
  };
};
