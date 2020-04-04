import React from 'react';
import Calendar from './Calendar';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { setDate } from './store/reducers/date';

const App = () => {
  const dispatch = useDispatch();
  dispatch(setDate(moment()));

  return <Calendar />;
};

export default App;
