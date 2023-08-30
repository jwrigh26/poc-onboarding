import { hasValue, isString } from 'helpers/utils';
import { useRef } from 'react';
import { useWizzardContext } from 'providers/WizzardProvider';
import Box from '@mui/material/Box';
import Button from 'components/Button';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Textfield from 'components/Inputs/Textfield';
import NumberTextfield from 'components/Inputs/NumberTextfield';

export default function Personal({ index }) {
  const inputRef = useRef([]);
  const { meta } = useWizzardContext();

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
  const { disabled, getError, handleBlur, handleChange, isValid } =
    useWizardInputHandler(
      [PERSONAL_ID.FIRSTNAME, PERSONAL_ID.LASTNAME, PERSONAL_ID.PHONENUMBER],
      inputRef,
      validationCallback
    );

  const handleSubmit = (event) => {
    event.preventDefault();
    const values = Object.values(inputRef.current).map((el) => {
      return el.value;
    });
    console.log(`%c${'HandleSubmit'}`, 'color: pink;');
    console.table(values);
    if (isValid()) {
      console.log(`%c${'Valid'}`, 'color: limeGreen;');
    } else {
      console.log(`%c${'NOT VALID'}`, 'color: red;');
    }
  };

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
        <NumberTextfield
          error={getError(PERSONAL_ID.PHONENUMBER)}
          id={PERSONAL_ID.PHONENUMBER}
          label="Phone Number"
          formatType="phone"
          hint="Example: ( xxx ) xxx - xxxx"
          inputRef={(el) => (inputRef.current[PERSONAL_ID.PHONENUMBER] = el)}
          maxLength={20}
          onBlur={handleBlur(PERSONAL_ID.PHONENUMBER)}
          onChange={handleChange(PERSONAL_ID.PHONENUMBER)}
        />
        {/* <NumberTextfield
          error={hasValue(error?.amount) ? error.amount : null}
          id="amount"
          label="Amount"
          formatType="currency"
          inputRef={(el) => (inputRef.current['amount'] = el)}
          maxLength={11}
          onBlur={handleInput('amount')}
          onChange={handleInput('amount')}
        /> */}
      </Stack>
      <Box sx={{ mb: 2 }}>
        <div>
          <Button
            color="secondary"
            disabled={disabled}
            onClick={handleSubmit}
            sx={{ mt: 1, mr: 1 }}
          >
            {index === meta.totalSteps ? 'Finish' : 'Continue'}
          </Button>
          <Button
            disabled={index === 0}
            onClick={() => console.log('back')}
            sx={{ mt: 1, mr: 1 }}
          >
            Back
          </Button>
        </div>
      </Box>
    </>
  );
}

Personal.propTypes = {
  index: PropTypes.number.isRequired,
};

// PERSONAL_IDS
const PERSONAL_ID = {
  FIRSTNAME: 'firstname',
  LASTNAME: 'lastname',
  PHONENUMBER: 'phonenumber',
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
    case 'phonenumber':
      const phoneRegex = /^\(\s*\d{3}\s*\)\s*\d{3}\s*-\s*\d{4}$/;
      if (!phoneRegex.test(value)) {
        error = 'Invalid phone number. Use format ( xxx ) xxx - xxxx';
      }
      break;
    case 'amount':
      if (value <= 0) {
        error = 'Amount should be greater than zero.';
      }
      break;
    default:
      break;
  }
  return error;
};
