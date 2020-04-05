import React from 'react';
import Calendar from './Calendar';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { setDate } from './store/reducers/date';

const App = () => {
  const dispatch = useDispatch();
  const date = new Date();
  const startOfTheMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  dispatch(setDate(moment(startOfTheMonth)));

  return <Calendar />;
};

export default App;
