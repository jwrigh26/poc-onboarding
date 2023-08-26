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
  return (
    <>
      <Stack sx={{ mt: 2, gap: 2 }}>
        <Textfield id="firstName" label="First Name" defaultValue="Warbo" />
        <Textfield
          id="lastName"
          label="Last Name"
          defaultValue="react-bootstrap"
        />
        <NumberTextfield id="amount" label="Amount" formatType="phone" />
      </Stack>
      <Box sx={{ mb: 2 }}>
        <div>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleNext}
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
