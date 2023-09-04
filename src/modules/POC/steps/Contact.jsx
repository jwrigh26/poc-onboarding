import { hasValue, isString } from 'helpers/utils';
import { useRef } from 'react';
import { useWizzardContext } from 'providers/WizzardProvider';
import { useWizardInputHandler } from 'hooks/useWizardInputHandler';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Textfield from 'components/Inputs/Textfield';
import NumberTextfield from 'components/Inputs/NumberTextfield';
import WizardButtons from 'components/Wizard/WizardButtons';

export default function Contact({ index }) {
  const inputRef = useRef([]);
  const { actions, meta } = useWizzardContext();

  // See notes in Personal.jsx for more details
  // Or see the hook itself
  const { disabled, getError, handleBlur, handleChange, isValid } =
    useWizardInputHandler(
      index,
      [CONTACT_IDS.EMAIL, CONTACT_IDS.PHONENUMBER],
      inputRef,
      validationCallback
    );

  return (
    <>
      <Stack sx={{ mt: 2, gap: 2 }}>
        <Textfield
          error={getError(CONTACT_IDS.EMAIL)}
          id={CONTACT_IDS.EMAIL}
          inputRef={(el) => (inputRef.current[CONTACT_IDS.EMAIL] = el)}
          label="Email Address"
          maxLength={50}
          onBlur={handleBlur(CONTACT_IDS.EMAIL)}
          onChange={handleChange(CONTACT_IDS.EMAIL)}
          placeholder="Enter your email address"
          required
        />
        <NumberTextfield
          error={getError(CONTACT_IDS.PHONENUMBER)}
          id={CONTACT_IDS.PHONENUMBER}
          label="Phone Number"
          formatType="phone"
          hint="Example: ( xxx ) xxx - xxxx"
          inputRef={(el) => (inputRef.current[CONTACT_IDS.PHONENUMBER] = el)}
          maxLength={20}
          onBlur={handleBlur(CONTACT_IDS.PHONENUMBER)}
          onChange={handleChange(CONTACT_IDS.PHONENUMBER)}
          required
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

Contact.propTypes = {
  index: PropTypes.number.isRequired,
};

// Ids to be used for the inputs and keep them consistent
const CONTACT_IDS = {
  EMAIL: 'email',
  PHONENUMBER: 'phoneNumber',
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
  // TODO: Handle these weird cases
  // required vs not requried
  const phoneRegex = /^\(\s*\d{3}\s*\)\s*\d{3}\s*-\s*\d{4}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  switch (id) {
    case CONTACT_IDS.PHONENUMBER:
      if (
        !value ||
        '' === value ||
        (id === CONTACT_IDS.PHONENUMBER && '( ___ ) ___ - ____' === value)
      ) {
        return null;
      } else if (!phoneRegex.test(value)) {
        error = 'Invalid phone number. Use format ( xxx ) xxx - xxxx';
      }
      break;
    case CONTACT_IDS.EMAIL:
      if (!hasValue(value)) {
        error = 'Email address is required.';
      } else if (!emailRegex.test(value)) {
        error = 'Invalid email address.';
      }
      break;
    default:
      break;
  }
  return error;
};

// Next work on Address and selection of state
