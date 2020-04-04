import React, { useState } from 'react';
import { HeaderNav } from './components';
import moment from 'moment';

const Calendar = () => {
  const [date, setDate] = useState(moment());
  const title = date.format('MMMM YYYY');

  const onPrev = () => {
    const prevDate = date.subtract(1, 'months').clone();
    setDate(prevDate);
  };
  const onNext = () => {
    const nextDate = date.add(1, 'months').clone();
    setDate(nextDate);
  };

  return (
    <React.Fragment>
      <HeaderNav title={title} prev={onPrev} next={onNext} />
    </React.Fragment>
  );
};

export default Calendar;
