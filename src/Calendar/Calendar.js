import React from 'react';
import { HeaderNav } from './components';
import { useSelector } from 'react-redux';

const Calendar = () => {
  const date = useSelector((state) => state.date);

  if (!date) return <h1>Loading</h1>;

  return (
    <React.Fragment>
      <HeaderNav date={date} />
    </React.Fragment>
  );
};

export default Calendar;
