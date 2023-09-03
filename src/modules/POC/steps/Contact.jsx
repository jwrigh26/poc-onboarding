import { hasValue, isString } from 'helpers/utils';
import { useRef } from 'react';
import { useWizzardContext } from 'providers/WizzardProvider';
import { useWizardInputHandler } from 'hooks/useWizardInputHandler';
import Box from '@mui/material/Box';
import Button from 'components/Button';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Textfield from 'components/Inputs/Textfield';
import NumberTextfield from 'components/Inputs/NumberTextfield';

export default function Contact({ index }) {
  const inputRef = useRef([]);
  const { actions, meta } = useWizzardContext();

  // See notes in Personal.jsx for more details
  // Or see the hook itself
  const {
    disabled,
    getError,
    handleBlur,
    handleChange,
    isValid,
    updateStepperErrorStatus,
  } = useWizardInputHandler(
    [CONTACT_IDS.EMAIL, CONTACT_IDS.PHONENUMBER],
    inputRef,
    validationCallback
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const values = Object.values(inputRef.current).map((el) => {
      return el.value;
    });
    // console.log(`%c${'HandleSubmit'}`, 'color: pink;');
    // console.table(values);
    if (isValid()) {
      // console.log(`%c${'Valid'}`, 'color: limeGreen;');
      actions.handleNext();
    } else {
      console.log(`%c${'NOT VALID'}`, 'color: red;');
    }
  };

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
            onClick={actions.handleBack}
            sx={{ mt: 1, mr: 1 }}
          >
            Back
          </Button>
        </div>
      </Box>
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
  if (
    !value ||
    '' === value ||
    (id === CONTACT_IDS.PHONENUMBER && '( ___ ) ___ - ____' === value)
  ) {
    return null;
  }
  switch (id) {
    case CONTACT_IDS.PHONENUMBER:
      const phoneRegex = /^\(\s*\d{3}\s*\)\s*\d{3}\s*-\s*\d{4}$/;
      if (!phoneRegex.test(value)) {
        error = 'Invalid phone number. Use format ( xxx ) xxx - xxxx';
      }
      break;
    case CONTACT_IDS.EMAIL:
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(value)) {
        error = 'Invalid email address.';
      }
      break;
    default:
      break;
  }
  return error;
};
