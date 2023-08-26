import { useCallback, useRef } from 'react';
import Box from '@mui/material/Box';
import Button from 'components/Button';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Textfield from 'components/Inputs/Textfield';
import NumberTextfield from 'components/Inputs/NumberTextfield';

export default function POCStep1({
  index,
  onBack: handleBack,
  onNext: handleNext,
  totalSteps,
}) {
  const inputRef = useRef([]);

  const handleValidation = (event) => {
    event.preventDefault();
    const values = inputRef.current.map((el) => el.value);
    console.log(values);
  };

  const handleInput = useCallback(
    (id) => (event) => {
      event.preventDefault();
      const input = inputRef.current[id];
      const inputValue = inputRef.current[id].value;
      console.log('Value', inputValue, 'input', input?.id);
    },
    []
  );

  return (
    <>
      <Stack sx={{ mt: 2, gap: 2 }}>
        <Textfield
          id="firstName"
          label="First Name"
          defaultValue="Warbo"
          // error="Something error!"
          inputRef={(el) => (inputRef.current['firstName'] = el)}
          required
          gutter
          onBlur={handleInput('firstName')}
          onChange={handleInput('firstName')}
        />
        <Textfield
          id="lastName"
          label="Last Name"
          defaultValue="react-bootstrap"
          hint="This is a hint"
          inputRef={(el) => (inputRef.current['lastName'] = el)}
          onBlur={handleInput('lastName')}
          onChange={handleInput('lastName')}
        />
        <NumberTextfield
          id="amount"
          label="Amount"
          formatType="phone"
          hint="should be a phone number"
          // error="Something error!"
          inputRef={(el) => (inputRef.current[2] = el)}
        />
      </Stack>
      <Box sx={{ mb: 2 }}>
        <div>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleValidation}
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
