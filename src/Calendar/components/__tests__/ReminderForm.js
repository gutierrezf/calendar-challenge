import React from 'react';
import user from '@testing-library/user-event';
import { render, waitFor } from '@testing-library/react';
import ReminderForm from '../ReminderForm';

test('it renders the form properly', () => {
  const MORE_THAN_30_CHARS_TEXT = 'Lorem ipsum dolor sit lorem ipsum.';
  const SHORT_TEXT = 'Lorem ipsum dolor';

  const { getByLabelText, getByTestId, getByTitle, queryByTestId } = render(
    <ReminderForm />,
  );

  const submitBtn = getByTestId('submit');
  expect(submitBtn).toBeDisabled();

  user.click(getByTitle('#f44336'));
  waitFor(() => expect(submitBtn).not.toBeDisabled());

  const input = getByLabelText(/reminder/i);
  user.type(input, MORE_THAN_30_CHARS_TEXT);
  user.click(getByTestId('submit'));

  waitFor(() =>
    expect(getByTestId('reminder-error')).toHaveTextContent(
      /1 and less than 30 chars/i,
    ),
  );

  user.type(input, SHORT_TEXT);
  expect(queryByTestId('reminder-error')).toBeNull();
});
