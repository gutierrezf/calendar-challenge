import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  align-items: center;
  background: ${(props) => props.theme.shilo};
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  width: 100%;

  @media (max-width: ${(props) => props.theme.small}) {
    display: none;
  }
`;

const WeekDay = styled.b`
  padding: 0.5rem;
  text-align: center;
  width: 100%;
`;

const WeekDayRow = () => {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  return (
    <Container>
      {days.map((day) => (
        <WeekDay key={day}>{day}</WeekDay>
      ))}
    </Container>
  );
};

export default WeekDayRow;
