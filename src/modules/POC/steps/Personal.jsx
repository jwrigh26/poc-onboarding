import { hasValue, isString } from 'helpers/utils';
import { useWizardInputHandler } from 'hooks/useWizardInputHandler';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Textfield from 'components/Inputs/Textfield';
import WizardButtons from 'components/Wizard/WizardButtons';

export default function Personal({ index }) {
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
    isValid,
    validationRef,
  } = useWizardInputHandler({
    ids: [PERSONAL_IDS.FIRSTNAME, PERSONAL_IDS.LASTNAME],
    validationCallback,
  });

  return (
    <>
      <Stack sx={{ mt: 2, gap: 2 }}>
        <Textfield
          autoFocus
          error={getError(PERSONAL_IDS.FIRSTNAME)}
          id={PERSONAL_IDS.FIRSTNAME}
          label="First Name"
          maxLength={50}
          onBlur={handleBlur(PERSONAL_IDS.FIRSTNAME)}
          onChange={handleChange(PERSONAL_IDS.FIRSTNAME)}
          placeholder="Enter your first name"
          required
          validationRef={validationRef}
        />
        <Textfield
          error={getError(PERSONAL_IDS.LASTNAME)}
          id={PERSONAL_IDS.LASTNAME}
          label="Last Name"
          maxLength={50}
          onBlur={handleBlur(PERSONAL_IDS.LASTNAME)}
          onChange={handleChange(PERSONAL_IDS.LASTNAME)}
          placeholder="Enter your last name"
          required
          validationRef={validationRef}
        />
      </Stack>
      <WizardButtons
        disabled={disabled}
        index={index}
        isValid={isValid}
        validationRef={validationRef}
      />
    </>
  );
}

Personal.propTypes = {
  index: PropTypes.number.isRequired,
};

// Ids to use for the inputs and keep them consistent
const PERSONAL_IDS = {
  FIRSTNAME: 'firstname',
  LASTNAME: 'lastname',
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
    case PERSONAL_IDS.FIRSTNAME:
      if (!hasValue(value)) {
        error = 'First name is required.';
      } else if (!isString(value)) {
        error = 'First name is invalid.';
      } else if (value.length < 2) {
        error = 'First name should be at least 2 characters.';
      }
      break;
    case PERSONAL_IDS.LASTNAME:
      if (!hasValue(value)) {
        error = 'Last name is required.';
      } else if (!isString(value)) {
        error = 'Last name is invalid.';
      } else if (value.length < 2) {
        error = 'Last name should be at least 2 characters.';
      }
      break;
    default:
      break;
  }
  return error;
};
