import Box from '@mui/material/Box';
import Button from 'components/Button';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

export default function POCStep1({
  index,
  onBack: handleBack,
  onNext: handleNext,
  totalSteps,
}) {
  return (
    <>
      <Typography>{description}</Typography>
      <Box sx={{ mb: 2 }}>
        <div>
          <Button
            variant="contained"
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

const description = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
    quam sem, suscipit ac tristique at, eleifend in quam. Maecenas ut
    hendrerit magna, in blandit justo. Vestibulum ante ipsum primis in
    faucibus orci luctus et ultrices posuere cubilia curae; Nulla ac
    feugiat quam.`;
