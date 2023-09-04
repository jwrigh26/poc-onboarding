import { useWizzardContext } from 'providers/WizzardProvider';
import Box from '@mui/material/Box';
import Button from 'components/Button';
import PropTypes from 'prop-types';

export default function WizardButtons({ disabled, index, inputRef, isValid }) {
  const { actions, meta, state } = useWizzardContext();
  const handleBack = () => {
    const valid = isValid({ dirty: true });
    console.log(`%c${'VALID'}: ${valid}`, 'color: purple;');
    actions.setStepError(!valid);
    actions.handleBack();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isValid()) {
      console.log(
        `%c${index === meta.totalSteps ? 'Finish' : 'Continue'}`,
        'color: limeGreen;'
      );
      // For each input current console log the value
      Object.keys(inputRef.current).forEach((key) => {
        console.log(
          `%c${key}: ${inputRef.current[key].value}`,
          'color: limeGreen;'
        );
      });
      actions.handleNext();
    } else {
      console.log(`%c${'NOT VALID'}`, 'color: pink;');
    }
  };

  return (
    <Box sx={{ mt: 3, mb: 1 }}>
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
  inputRef: PropTypes.object.isRequired,
  isValid: PropTypes.func.isRequired,
};
