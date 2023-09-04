import { useWizzardContext } from 'providers/WizzardProvider';
import Box from '@mui/material/Box';
import Button from 'components/Button';
import PropTypes from 'prop-types';

export default function WizardButtons({ disabled, index, isValid }) {
  const { actions, meta, state } = useWizzardContext();
  const handleBack = () => {
    actions.setStepError(!isValid());
    actions.handleBack();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isValid()) {
      console.log(
        `%c${index === meta.totalSteps ? 'Finish' : 'Continue'}`,
        'color: limeGreen;'
      );
      actions.handleNext();
    } else {
      console.log(`%c${'NOT VALID'}`, 'color: pink;');
    }
  };

  return (
    <Box sx={{ mt: 4, mb: 1 }}>
      <Button
        color="secondary"
        disabled={disabled}
        onClick={handleSubmit}
        sx={{ mt: 1, mr: 1 }}
      >
        {index === meta.totalSteps ? 'Finish' : 'Continue'}
      </Button>
      {index > 0 && (
        <Button
          disabled={index === 0}
          onClick={handleBack}
          sx={{ mt: 1, mr: 1 }}
        >
          Back
        </Button>
      )}
    </Box>
  );
}

WizardButtons.propTypes = {
  disabled: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  isValid: PropTypes.func.isRequired,
};
