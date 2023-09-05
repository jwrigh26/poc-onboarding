import { hasValue, isString } from 'helpers/utils';
import { useWizardInputHandler } from 'hooks/useWizardInputHandler';
import NumberTextfield from 'components/Inputs/NumberTextfield';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Textfield from 'components/Inputs/Textfield';
import WizardButtons from 'components/Wizard/WizardButtons';

export default function Contact({ index }) {
  // See notes in Personal.jsx for more details
  // Or see the hook itself
  const {
    disabled,
    getError,
    handleBlur,
    handleChange,
    isValid,
    validationRef,
  } = useWizardInputHandler(
    index,
    [CONTACT_IDS.EMAIL, CONTACT_IDS.PHONENUMBER],
    validationCallback
  );

  return (
    <>
      <Stack sx={{ mt: 2, gap: 2 }}>
        <Textfield
          autoComplete="email"
          error={getError(CONTACT_IDS.EMAIL)}
          id={CONTACT_IDS.EMAIL}
          label="Email Address"
          maxLength={50}
          onBlur={handleBlur(CONTACT_IDS.EMAIL)}
          onChange={handleChange(CONTACT_IDS.EMAIL)}
          placeholder="Enter your email address"
          required
          validationRef={validationRef}
        />
        <NumberTextfield
          autoComplete="tel"
          error={getError(CONTACT_IDS.PHONENUMBER)}
          id={CONTACT_IDS.PHONENUMBER}
          label="Phone Number"
          formatType="phone"
          hint="Example: ( xxx ) xxx - xxxx"
          maxLength={20}
          onBlur={handleBlur(CONTACT_IDS.PHONENUMBER)}
          onChange={handleChange(CONTACT_IDS.PHONENUMBER)}
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

  // Function to clean up phone number by removing non-digits
  const cleanPhoneNumber = (phoneNumber) => phoneNumber.replace(/\D/g, '');

  const phoneRegex = /^\d{10}$/; // Just checking for 10 digits now
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  switch (id) {
    case CONTACT_IDS.PHONENUMBER:
      const cleanValue = cleanPhoneNumber(value);
      console.log(`%c${'CleanedPhoneNumber'} ${cleanValue}`, 'color: #967bb6;');
      if (!cleanValue) {
        return null; // Empty, so let it pass or return an error based on if the field is required
      } else if (!phoneRegex.test(cleanValue)) {
        error = 'Invalid phone number. Use format ( xxx ) xxx - xxxx';
      }
      break;

    case CONTACT_IDS.EMAIL:
      if (!value) {
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
