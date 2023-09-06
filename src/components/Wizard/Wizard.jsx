import { styled, useTheme } from '@mui/material/styles';
import { useWizzardContext } from 'providers/WizzardProvider';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import MobileWizard from './MobileWizard';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepButton from '@mui/material/StepButton';
import Typography from '@mui/material/Typography';

export default function Wizard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <>
      {!isMobile && <DesktopWizard />}
      {isMobile && <MobileWizard />}
    </>
  );
}

function DesktopWizard() {
  const { state, actions, meta } = useWizzardContext();
  const { activeStep } = state;
  const { handleActiveStep } = actions;
  const { totalSteps } = meta;
  const { steps } = state;

  const currentStep = steps.get(activeStep);

  const handleNonLinearClick = (index) => () => {
    handleActiveStep(index);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Stepper nonLinear activeStep={activeStep}>
        {Array.from(steps, ([index, step]) => (
          <Step key={step.label}>
            <StepButton onClick={handleNonLinearClick(index)}>
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
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <Main>
        <Box>{<currentStep.Element index={activeStep} />}</Box>
        <Box>side stuff</Box>
      </Main>
    </Box>
  );
}

const Main = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateAreas: `
    'main summary'
  `,
  gridTemplateColumns: '1fr minmax(256px, auto)',
  alignItems: 'start',
  justifyContent: 'center',
  height: '100%',
  gap: theme.spacing(2),

  // Placeholder colors using nth-of-type
  '& > :nth-of-type(1)': {
    gridArea: 'main',
    backgroundColor: 'lightblue',
  },
  '& > :nth-of-type(2)': {
    gridArea: 'summary',
    backgroundColor: 'lightgreen',
  },

  [theme.breakpoints.down('lg')]: {
    gridTemplateAreas: `
      'main'
    `,
    gridTemplateColumns: '1fr',
    '& > :nth-of-type(2)': {
      display: 'none',
    },
  },
}));
