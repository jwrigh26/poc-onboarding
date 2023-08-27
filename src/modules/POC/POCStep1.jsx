import { useCallback, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Button from 'components/Button';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Textfield from 'components/Inputs/Textfield';
import NumberTextfield from 'components/Inputs/NumberTextfield';
import { hasValue, isString } from '../../helpers/utils';

export default function POCStep1({
  index,
  onBack: handleBack,
  onNext: handleNext,
  totalSteps,
}) {
  const { validate } = useValidation();
  const inputRef = useRef([]);
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const values = Object.values(inputRef.current).map((el) => {
      return el.value;
    });
    console.table(values);
  };

  const handleInput = useCallback(
    (id) => (event) => {
      event.preventDefault();
      const value = event.target.value; //  inputRef.current[id]?.value
      const validationError = validate(id, value);
      if (validationError) {
        setError((prevErrors) => ({
          ...prevErrors,
          [id]: validationError,
        }));
      } else {
        setError((prevErrors) => ({
          ...prevErrors,
          [id]: null,
        }));
      }
    },
    []
  );

  return (
    <>
      <Stack sx={{ mt: 2, gap: 2 }}>
        <Textfield
          autoFocus
          error={hasValue(error?.firstname) ? error.firstname : null}
          id="firstname"
          label="First Name"
          inputRef={(el) => (inputRef.current['firstname'] = el)}
          maxLength={50}
          onBlur={handleInput('firstname')}
          onChange={handleInput('firstname')}
          placeholder="Enter your first name"
          required
        />
        <Textfield
          error={hasValue(error?.lastname) ? error.lastname : null}
          id="lastname"
          inputRef={(el) => (inputRef.current['lastname'] = el)}
          label="Last Name"
          maxLength={50}
          onBlur={handleInput('lastname')}
          onChange={handleInput('lastname')}
          placeholder="Enter your last name"
          required
        />
        <NumberTextfield
          error={hasValue(error?.phonenumber) ? error.phonenumber : null}
          id="phonenumber"
          label="Phone Number"
          formatType="phone"
          hint="Example: ( xxx ) xxx - xxxx"
          inputRef={(el) => (inputRef.current['phonenumber'] = el)}
          maxLength={20}
          onBlur={handleInput('phonenumber')}
          onChange={handleInput('phonenumber')}
        />
        <NumberTextfield
          error={hasValue(error?.amount) ? error.amount : null}
          id="amount"
          label="Amount"
          formatType="currency"
          inputRef={(el) => (inputRef.current['amount'] = el)}
          maxLength={11}
          onBlur={handleInput('amount')}
          onChange={handleInput('amount')}
        />
      </Stack>
      <Box sx={{ mb: 2 }}>
        <div>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSubmit}
            sx={{ mt: 1, mr: 1 }}
          >
            {index === totalSteps ? 'Finish' : 'Continue'}
          </Button>
          <Button
            disabled={index === 0}
            onClick={handleBack}
            sx={{ mt: 1, mr: 1 }}
          >
            Back
          </Button>
        </div>
      </Box>
    </>
  );
}

POCStep1.propTypes = {
  index: PropTypes.number.isRequired,
  onBack: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  totalSteps: PropTypes.number.isRequired,
};

// Validation hook or function to manage all validations
const useValidation = () => {
  const validate = (id, value) => {
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

  return { validate };
};
