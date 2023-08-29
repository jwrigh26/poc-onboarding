import { hasValue, isString } from 'helpers/utils';
import { useCallback, useRef, useState } from 'react';
import { useDebounce } from 'hooks/useDebounce';
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
  // It takes the ids and well as the inputRef as a parameter to access the input values
  // It returns several functions to handle blur, change, and validation
  // As well as a function to get the error for a given input
  // Note: It exepects all inputs to have an id and be unconrtolled inputs
  const { disabled, getError, handleBlur, handleChange, validate } =
    useInputHandler(['firstname', 'lastname', 'phonenumber'], inputRef);

  const handleSubmit = (event) => {
    event.preventDefault();
    const values = Object.values(inputRef.current).map((el) => {
      return el.value;
    });
    console.log(`%c${'HandleSubmit'}`, 'color: pink;');
    console.table(values);
    const isValid = validate();
    if (isValid) {
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
          error={getError('firstname')}
          id="firstname"
          label="First Name"
          inputRef={(el) => (inputRef.current['firstname'] = el)}
          maxLength={50}
          onBlur={handleBlur('firstname')}
          onChange={handleChange('firstname')}
          placeholder="Enter your first name"
          required
        />
        <Textfield
          error={getError('lastname')}
          id="lastname"
          inputRef={(el) => (inputRef.current['lastname'] = el)}
          label="Last Name"
          maxLength={50}
          onBlur={handleBlur('lastname')}
          onChange={handleChange('lastname')}
          placeholder="Enter your last name"
          required
        />
        <NumberTextfield
          error={getError('phonenumber')}
          id="phonenumber"
          label="Phone Number"
          formatType="phone"
          hint="Example: ( xxx ) xxx - xxxx"
          inputRef={(el) => (inputRef.current['phonenumber'] = el)}
          maxLength={20}
          onBlur={handleBlur('phonenumber')}
          onChange={handleChange('phonenumber')}
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
            variant="contained"
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

// Validation hook or function to manage all validations
const useInputValidation = () => {
  const inputValidation = (id, value) => {
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

  return { inputValidation };
};

/**
 * Custom hook to handle all input changes
 * @param {Array} ids
 * @param {Object} ref
 * @returns {Object} { disabled, getError, handleBlur, handleChange, validate }
 */
const useInputHandler = (ids, ref) => {
  const { inputValidation } = useInputValidation();
  const { actions } = useWizzardContext();
  // Object of errors to track
  const [errors, setError] = useState(null);
  // Object to track if an input has been dirtied
  const [dirty, setDirty] = useState({});

  const getError = (id) => {
    return errors?.[id] || null;
  };

  /**
   * Validate all inputs
   * @param {Array} inputs
   * @returns {Boolean} isValid
   */
  const validate = () => {
    // check if at least one input has error
    const hasValidationError = ids?.some((id) => {
      const value = ref.current[id]?.value;
      const validationError = inputValidation(id, value);
      return !!validationError;
    });
    return !hasValidationError; // Return opposite of hasValidationError for isValid
  };

  // Used to check if the form is valid. It's returned and used in the component
  // as disabled for the submit button
  // We return !allInputsValid because we want to disable the button if the form is not valid
  const [allInputsValid, setAllInputValid] = useState(validate());

  const handleInput = (event) => {
    console.log({ event: event.target?.value });
    // event.preventDefault();
    const id = event.target?.id;
    const value = event.target?.value; //  inputRef.current[id]?.value is another way but this is more readable
    console.log({ id, value });
    const validationError = inputValidation(id, value);
    // Based on id check for error and set error state
    // If no error update error state to null
    if (validationError) {
      setError((prevErrors) => ({
        ...prevErrors,
        [id]: validationError,
      }));
      // Update the stepper too
      actions.setError();
    } else {
      setError((prevErrors) => ({
        ...prevErrors,
        [id]: null,
      }));
      // Clear the stepper error from the stepper
      actions.clearError();
    }
  };

  const handleBlur = (id) =>
    useCallback((event) => {
      handleInput(event);
      // Let's check if we should dirty the input
      // We only want to dirty if the input on blur is valid
      // Guard: first check if dirty, if dirty we bail.
      if (dirty[id]) return;
      // If not dirty, set dirty to true
      setDirty((prevDirty) => ({
        ...prevDirty,
        [id]: true,
      }));
    }, []);

  const handleDebouncedInput = useDebounce(handleInput);

  const handleChange = (id) =>
    useCallback(
      (event) => {
        // Run through all fields and check if they are valid
        // We do this here to ensure we don't miss something between input
        // onblurs and onchanges
        setAllInputValid(validate());

        if (dirty[event.target?.id]) {
          console.log(
            `%c${'isDirty'} ${event.target?.id}: ${dirty[event.target?.id]}`,
            'color: #967bb6;'
          );
          handleDebouncedInput(event);
        }
      },
      [dirty[id]]
    );

  return {
    disabled: !allInputsValid,
    getError,
    handleBlur,
    handleChange,
    setDirty,
    validate,
  };
};

// TODO: Rename things and work on padding of textfields and error gutter
