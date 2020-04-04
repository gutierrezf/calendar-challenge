import React from 'react';
import Calendar from './Calendar';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { setDate } from './store/reducers/date';

const App = () => {
  const dispatch = useDispatch();
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  dispatch(setDate(moment(`${year}-${month}`)));

  return <Calendar />;
};

export default App;
