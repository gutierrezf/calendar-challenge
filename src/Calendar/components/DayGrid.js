import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import Popup from 'reactjs-popup';
import { useDispatch, useSelector } from 'react-redux';
import {
  createReminder,
  updateReminder,
  deleteReminder,
} from '../../store/reducers/reminders';

import ReminderForm from './ReminderForm';

const DayContainer = styled.div`
  background: ${(props) => props.theme.iron};
  border: 1px solid;
  border-color: ${(props) => props.theme.quarterSpanishWhite};
  border-top: 0;
  display: flex;
  flex-direction: column;
  margin-left: -1px;
  height: 150px;
  padding-top: 1.5rem;
  position: relative;
  overflow: hidden;
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
    padding-top: 0;

    &:before {
      border-radius: 5px;
      content: '${(props) => props.dayName} ${(props) => props.dayNumber}';
      padding: 0.2rem;
    }
  }
`;

const AddReminderButton = styled.button`
  background: ${(props) => props.theme.greenPea};
  border-radius: 5px;
  color: white;
  padding: 3px 5px;
  position: absolute;
  right: 0.5rem;
  top: 4px;
  z-index: 1;

  @media (max-width: ${(props) => props.theme.small}) {
    left: 0.5rem;
    padding: 0.5rem;
    top: 2rem;
  }
`;

const EditReminderButton = styled.button`
  border-radius: 5px;
  padding: 3px 5px;
`;
const DeleteReminderButton = styled(EditReminderButton)`
  margin-left: 0.25rem;
`;

const Reminder = styled.div`
  align-items: center;
  background: ${(props) => props.color};
  color: white;
  display: flex;
  border-radius: 0.2rem;
  flex-direction: column-reverse;
  font-size: 0.5rem;
  justify-content: space-between;
  margin: 0.5rem auto 0;
  padding: 0.5rem;
  position: relative;
  width: 90%;

  &:last-child {
    margin-bottom: 0.5rem;
  }

  @media (max-width: ${(props) => props.theme.small}) {
    flex-direction: row-reverse;
    margin: 0.5rem 0.5rem 0 0;
    width: 70%;
  }
`;

const DayGrid = ({ date }) => {
  const key = date.format('MMMM D YYYY');
  const dispatch = useDispatch();
  const reminders = useSelector((state) => state.reminders[key]) || [];
  const dayName = date.format('dddd');
  const dayNumber = date.format('D');

  const handleReminder = (reminderData, isUpdate) => {
    if (isUpdate) {
      dispatch(updateReminder(key, reminderData));
    } else {
      dispatch(createReminder(key, reminderData));
    }
  };

  const handleDeleteReminder = (id) => {
    dispatch(deleteReminder(key, id));
  };

  return (
    <DayContainer dayName={dayName} dayNumber={dayNumber}>
      <Popup
        trigger={<AddReminderButton>Add</AddReminderButton>}
        modal
        closeOnDocumentClick
      >
        {(close) => (
          <ReminderForm
            onComplete={(data) => {
              handleReminder(data);
              close();
            }}
          />
        )}
      </Popup>
      {reminders &&
        reminders.map((reminder, index) => (
          <Reminder key={index} color={reminder.color}>
            <div>
              <Popup
                trigger={<EditReminderButton>Edit</EditReminderButton>}
                modal
                closeOnDocumentClick
              >
                {(close) => (
                  <ReminderForm
                    reminder={reminder}
                    onComplete={(data, isUpdate) => {
                      handleReminder(data, isUpdate);
                      close();
                    }}
                  />
                )}
              </Popup>
              <DeleteReminderButton
                onClick={() => handleDeleteReminder(reminder.id)}
              >
                Delete
              </DeleteReminderButton>
            </div>
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
