import React from 'react';
import { HeaderNav, TableGrid, WeekDayRow } from './components';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Container = styled.div`
  align-items: center;
  color: ${(props) => props.theme.blueZodiac};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.5rem;
`;

const Calendar = () => {
  const date = useSelector((state) => state.date);

  if (!date) return <h1>Loading</h1>;

  return (
    <Container>
      <HeaderNav date={date} />
      <WeekDayRow />
      <TableGrid date={date} />
    </Container>
  );
};

export default Calendar;
