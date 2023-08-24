import Box from '@mui/material/Box';
import Button from 'components/Button';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Textfield from 'components/Textfield';

export default function POCStep1({
  index,
  onBack: handleBack,
  onNext: handleNext,
  totalSteps,
}) {
  return (
    <>
      <Stack sx={{ mt: 2, gap: 2 }}>
        <Textfield id="firstName" label="First Name" />
        <Textfield id="lastName" label="Last Name" />
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
