import { hasValue, isString } from 'helpers/utils';
import { useRef } from 'react';
import { useWizardInputHandler } from 'hooks/useWizardInputHandler';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Textfield from 'components/Inputs/Textfield';
import WizardButtons from 'components/Wizard/WizardButtons';

import Select from 'components/Inputs/Select';

export default function Personal({ index }) {
  const inputRef = useRef([]);

  // Spin up a custom hook to handle all input changes
  // It takes the ids and well a ref used to access the input values
  // It also takes a validation callback to validate the input
  // It returns a bag of goodies to handle the inputs
  // - disabled: boolean to disable the submit button
  // - getError: function to get the error for a given input
  // - handleBlur: function to handle the blur event for a given input
  // - handleChange: function to handle the change event for a given input
  // - isValid: function to validate all inputs
  // Note: It exepects all inputs to have an id and be unconrtolled inputs
  const {
    disabled,
    getError,
    handleBlur,
    handleChange,
    handleSelect,
    isValid,
  } = useWizardInputHandler(
    index,
    [PERSONAL_ID.FIRSTNAME, PERSONAL_ID.LASTNAME, PERSONAL_ID.FOO],
    inputRef,
    validationCallback
  );

  return (
    <>
      <Stack sx={{ mt: 2, gap: 2 }}>
        <Textfield
          autoFocus
          error={getError(PERSONAL_ID.FIRSTNAME)}
          id={PERSONAL_ID.FIRSTNAME}
          label="First Name"
          inputRef={(el) => (inputRef.current[PERSONAL_ID.FIRSTNAME] = el)}
          maxLength={50}
          onBlur={handleBlur(PERSONAL_ID.FIRSTNAME)}
          onChange={handleChange(PERSONAL_ID.FIRSTNAME)}
          placeholder="Enter your first name"
          required
        />
        <Textfield
          error={getError(PERSONAL_ID.LASTNAME)}
          id={PERSONAL_ID.LASTNAME}
          inputRef={(el) => (inputRef.current[PERSONAL_ID.LASTNAME] = el)}
          label="Last Name"
          maxLength={50}
          onBlur={handleBlur(PERSONAL_ID.LASTNAME)}
          onChange={handleChange(PERSONAL_ID.LASTNAME)}
          placeholder="Enter your last name"
          required
        />
        <Select
          id={PERSONAL_ID.FOO}
          label="Foo Label"
          inputRef={(el) => (inputRef.current[PERSONAL_ID.FOO] = el)}
          onChange={handleSelect(PERSONAL_ID.FOO)}
        />
      </Stack>
      <WizardButtons
        disabled={disabled}
        index={index}
        inputRef={inputRef}
        isValid={isValid}
      />
    </>
  );
}

Personal.propTypes = {
  index: PropTypes.number.isRequired,
};

// Ids to use for the inputs and keep them consistent
const PERSONAL_ID = {
  FIRSTNAME: 'firstname',
  LASTNAME: 'lastname',
  FOO: 'foome',
};

/**
 * Validates the input and returns an error if invalid
 * @param {string} id - The id of the input
 * @param {string} value - The value of the input
 * @returns {string} - The error message if invalid
 * @returns {null} - If valid
 * @example
 * const error = validationCallback('firstname', 'John');
 * if (error) {
 *  console.log(error);
 * }
 */
const validationCallback = (id, value) => {
  let error = null;
  switch (id) {
    case 'firstname':
      if (!hasValue(value)) {
        error = 'First name is required.';
      } else if (!isString(value)) {
        error = 'First name is invalid.';
      } else if (value.length < 2) {
        error = 'First name should be at least 2 characters.';
      }
      break;
    case 'lastname':
      if (!hasValue(value)) {
        error = 'Last name is required.';
      } else if (!isString(value)) {
        error = 'Last name is invalid.';
      } else if (value.length < 2) {
        error = 'Last name should be at least 2 characters.';
      }
      break;
    case 'foome':
      break;
    default:
      break;
  }
  return error;
};
