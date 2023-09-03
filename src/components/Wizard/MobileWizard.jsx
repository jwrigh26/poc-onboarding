import { hasValue } from 'helpers/utils';
import { useWizzardContext } from 'providers/WizzardProvider';
import Box from '@mui/material/Box';
import Button from 'components/Button';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Typography from '@mui/material/Typography';

export default function MobileWizzard() {
  const { state, actions, meta } = useWizzardContext();
  const { activeStep } = state;
  const { handleReset } = actions;
  const { totalSteps } = meta;
  const { steps } = state;
  // We itterate the Map using Array.from
  // Array.from creates a new array where
  // each element is a key/value pair
  // index is the map key and step is the value
  // We pass the index to the step element so it can
  // know which step it is if needed and also to
  // check if it is the last step
  return (
    <Box sx={{ p: 2 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {Array.from(steps, ([index, step]) => (
          <Step key={step.label}>
            <StepLabel
              error={step.error}
              optional={
                index === totalSteps - 1 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>{<step.Element index={index} />}</StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep > totalSteps && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}
