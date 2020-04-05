import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import { CirclePicker } from 'react-color';
import uid from 'uid';

import 'rc-time-picker/assets/index.css';

const Form = styled.form`
  padding: 0.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
`;

const Button = styled.button`
  background: white;
  background: ${(props) => props.color};
  border-radius: 5px;
  color: black;
  display: block;
  padding: 0.5rem 1rem;

  &[disabled='false'] {
    background: ${(props) => props.theme.foggyGray};
  }
`;

const Error = styled.span`
  color: red;
  font-size: 0.8rem;
`;

const Input = styled.input`
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  color: ${(props) => props.theme.trout};
  display: block;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 0.375rem 0.75rem;
  width: 100%;
`;

const ReminderForm = ({ reminder, onComplete }) => {
  const [time, setTime] = useState(reminder.time || 0);
  const [color, setColor] = useState(reminder.color || '');
  const { register, handleSubmit, errors } = useForm({
    defaultValues: reminder,
  });
  const isUpdate = Boolean(reminder.id);

  const onSubmit = handleSubmit((reminderFormData) => {
    if (!isUpdate) {
      reminderFormData.id = uid();
    }

    onComplete({ ...reminderFormData, time, color });
  });

  const onTimeChanged = (timeDate) => {
    const timeValue = parseInt(timeDate.format('Hmm'));
    setTime(timeValue);
  };

  const onColorPicked = (color) => {
    setColor(color.hex);
  };

  const now = moment().hour(0).minute(0);

  return (
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <Label>Time</Label>
        <TimePicker
          showSecond={false}
          defaultValue={now}
          onChange={onTimeChanged}
          format={'h:mm a'}
          use12Hours
          inputReadOnly
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="desc">Reminder</Label>
        <Input
          id="desc"
          placeholder="Reminder"
          name="desc"
          type="text"
          ref={register({ required: true, maxLength: 30 })}
        />
        {errors.desc && (
          <Error>This field is required and max length is 30</Error>
        )}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="city">City</Label>
        <Input
          id="city"
          placeholder="City"
          name="city"
          type="text"
          ref={register({ required: true })}
        />
        {errors.city && <Error>This field is required</Error>}
      </FormGroup>

      <FormGroup>
        <CirclePicker onChangeComplete={onColorPicked} />
      </FormGroup>

      <Button color={color} disabled={!color} type="submit">
        {!color && <Error>Select a color</Error>}
        {color && (isUpdate ? 'Update' : 'Create')}
      </Button>
    </Form>
  );
};

ReminderForm.defaultProps = {
  onComplete: () => {},
  reminder: {},
};

ReminderForm.propTypes = {
  onComplete: PropTypes.func,
  reminder: PropTypes.shape({
    id: PropTypes.string,
    city: PropTypes.string,
    color: PropTypes.string,
    desc: PropTypes.string,
    time: PropTypes.number,
  }),
};

export default ReminderForm;
