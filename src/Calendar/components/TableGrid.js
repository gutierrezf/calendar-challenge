import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import DayGrid from './DayGrid';

const NUMBER_OF_DAYS = 7;

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;

const WeekRow = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 100%;

  @media (max-width: ${(props) => props.theme.small}) {
    flex-direction: column;
  }
`;

const BlankGrid = styled.div`
  background: ${(props) => props.theme.foggyGray};
  border: 1px solid;
  border-color: ${(props) => props.theme.quarterSpanishWhite};
  border-top: 0;
  margin-left: -1px;
  min-height: 100px;
  width: 100%;

  @media (max-width: ${(props) => props.theme.small}) {
    display: none;
  }
`;

const getBlacksGrid = (num, prefix = 'start') => {
  const blacks = [...Array(num).keys()];

  return blacks.map((index) => {
    return <BlankGrid key={`blank-${prefix}-${index}`} />;
  });
};

const getWeekGrid = (start, end, date) => {
  const days = [];
  for (let i = start; i <= end; i++) {
    const dayDate = date.clone().add(i - 1, 'days');
    days.push(<DayGrid key={dayDate.format('MMMM D YYYY')} date={dayDate} />);
  }

  return days;
};

const createGrid = (date) => {
  const firstDayAsString = moment(date).startOf('month').format('d');
  const daysInTheMonth = moment(date).daysInMonth();
  const firstDay = parseInt(firstDayAsString);
  let offSetDays = NUMBER_OF_DAYS - firstDay;

  const fistWeek = [
    ...getBlacksGrid(firstDay),
    ...getWeekGrid(1, offSetDays, date),
  ];

  const gridItems = [fistWeek];

  while (offSetDays < daysInTheMonth) {
    const newOffSetDays = Math.min(offSetDays + NUMBER_OF_DAYS, daysInTheMonth);
    let nextWeek = getWeekGrid(offSetDays + 1, newOffSetDays, date);

    if (nextWeek.length !== NUMBER_OF_DAYS) {
      nextWeek = [
        ...nextWeek,
        ...getBlacksGrid(NUMBER_OF_DAYS - nextWeek.length, 'end'),
      ];
    }

    offSetDays = newOffSetDays;
    gridItems.push(nextWeek);
  }

  return gridItems;
};

const TableGrid = ({ date }) => {
  const grid = createGrid(date);

  return (
    <Container>
      {grid.map((week, index) => (
        <WeekRow key={index}>{week}</WeekRow>
      ))}
    </Container>
  );
};

TableGrid.propTypes = {
  date: PropTypes.instanceOf(moment),
};

export default TableGrid;
