import { useWizzardContext } from 'providers/WizzardProvider';
import Box from '@mui/material/Box';
import Button from 'components/Button';
import PropTypes from 'prop-types';

export default function WizardButtons({ disabled, index, isValid }) {
  const { actions, meta } = useWizzardContext();
  const handleBack = () => {
    if (isValid()) {
      actions.clearError();
    } else {
      actions.setError();
    }
    actions.handleBack();
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Button
        color="secondary"
        disabled={disabled}
        onClick={handleSubmit}
        sx={{ mt: 1, mr: 1 }}
      >
        {index === meta.totalSteps ? 'Finish' : 'Continue'}
      </Button>
      <Button disabled={index === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
        Back
      </Button>
    </Box>
  );
}

WizardButtons.propTypes = {
  disabled: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  isValid: PropTypes.func.isRequired,
};
