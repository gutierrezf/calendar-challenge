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
      state[action.key] = handleCreate(state[action.key], action.reminder);
      return state;
    case UPDATE:
      state[action.key] = handleUpdate(state[action.key], action.reminder);
      return state;
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

function handleCreate(reminders, newReminder) {
  if (!reminders) {
    reminders = [];
  }
  reminders.push(newReminder);

  return [...reminders];
}

function handleUpdate(reminders, newReminder) {
  let index = reminders.findIndex((r) => (r.id = newReminder.id));
  if (index >= 0) {
    reminders[index] = { ...newReminder };
  }
  return [...reminders];
}
