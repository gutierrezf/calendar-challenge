import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';

const DayContainer = styled.div`
  background: ${(props) => props.theme.iron};
  border: 1px solid;
  border-color: ${(props) => props.theme.quarterSpanishWhite};
  border-top: 0;
  display: flex;
  flex-direction: column;
  margin-left: -1px;
  height: 100px;
  position: relative;
  width: 100%;

  &:before {
    background: ${(props) => props.theme.blueZodiac};
    border-radius: 50%;
    color: ${(props) => props.theme.shilo};
    content: '${(props) => props.dayNumber}';
    font-size: 0.8rem;
    min-height: 1rem;
    left: 0.5rem;
    position: absolute;
    text-align: center;
    top: 0.5rem;
    min-width: 1rem;
    z-index: 1;
  }

  @media (max-width: ${(props) => props.theme.small}) {
    align-items: flex-end;
    height: auto;
    min-height: 100px;

    &:before {
      border-radius: 5px;
      content: '${(props) => props.dayName} ${(props) => props.dayNumber}';
      padding: 0.2rem;
    }
  }
`;

const Reminder = styled.span`
  background: ${(props) => props.color};
  color: white;
  border-radius: 0.2rem;
  font-size: 0.5rem;
  margin: 0.5rem auto 0;
  padding: 0.5rem;
  position: relative;
  width: 80%;

  &:last-child {
    margin-bottom: 0.5rem;
  }

  @media (max-width: ${(props) => props.theme.small}) {
    margin: 0.5rem 0 0;
  }
`;

const DayGrid = ({ date }) => {
  const [reminders, setReminders] = useState([]);
  const dayName = date.format('dddd');
  const dayNumber = date.format('D');

  const addReminder = () => {
    setReminders([
      ...reminders,
      {
        city: 'miami',
        desc: 'Heellow! This is a test',
        color: ['red', 'green', 'blue', 'gray'][Math.floor(Math.random() * 4)],
      },
    ]);
  };

  return (
    <DayContainer dayName={dayName} dayNumber={dayNumber} onClick={addReminder}>
      {reminders.map((reminder, index) => (
        <Reminder key={index} color={reminder.color}>
          {reminder.desc}
        </Reminder>
      ))}
    </DayContainer>
  );
};

DayGrid.propTypes = {
  date: PropTypes.instanceOf(moment),
};

export default DayGrid;
