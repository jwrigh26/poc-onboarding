import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from 'components/Button';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

// Steps
import Step1 from 'modules/POC/POCStep1';

export default function POCWizzard() {
  return (
    <Grid>
      <Main>
        <MobileStepper />
      </Main>
      {/* Supporting columns */}
      {/* Nothing is shown for now in Leading */}
      <Leading />
      {/* For Trailing we will show the status  */}
      <Trailing />
    </Grid>
  );
}

// Mobile Stepper
function MobileStepper() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <Box sx={{ p: 2 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              {
                <step.Element
                  index={index}
                  onBack={handleBack}
                  onNext={handleNext}
                  totalSteps={steps.length - 1}
                />
              }
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
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

// Styled Components

const Grid = styled((props) => <Box component="main" {...props} />)(
  ({ theme }) => ({
    display: 'grid',
    height: '100%',
    backgroundColor: theme.palette.background.paper,
    gridTemplateColumns: '1fr',
    gridTemplateAreas: `
        'main'
        `,
    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: `minmax(0, 1fr) ${theme.breakpoints.values.lg}px minmax(0, 1fr)`,
      margin: '0 auto',
      gridTemplateAreas: `
        'leading main trailing'
        `,
    },
  })
);

const Main = styled((props) => <Box {...props} />)(({ theme }) => ({
  gridArea: 'main',
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
}));

const Leading = styled((props) => <Box component="aside" {...props} />)(
  ({ theme }) => ({
    gridArea: 'leading',
    flexGrow: 1,
    display: 'none',
    height: '100%',
    backgroundColor: theme.palette.primary.customScale[100],
    [theme.breakpoints.up('lg')]: {
      display: 'flex',
    },
  })
);

const Trailing = styled((props) => <Box component="aside" {...props} />)(
  ({ theme }) => ({
    gridArea: 'trailing',
    flexGrow: 1,
    display: 'none',
    height: '100%',
    backgroundColor: theme.palette.primary.customScale[100],
    [theme.breakpoints.up('lg')]: {
      display: 'flex',
    },
  })
);

const steps = [
  {
    label: 'Step 1 Personal Information',
    Element: Step1,
  },
  {
    label: 'Step 2 Address Information',
    Element: Step1,
  },
  {
    label: 'Step 3 Calener Demo',
    Element: Step1,
  },
  {
    label: 'Step 3 File Demo',
    Element: Step1,
  },
  {
    label: 'Step 4 Review',
    Element: Step1,
  },
];
