import { useState } from 'react';
import {
  Grid,
  Main,
  Leading,
  Trailing,
  StartTitle,
  StartSubtitle,
  StartGrid,
  StartContentWrapper,
} from './Styles';
import Button from 'components/Button';
import Stack from '@mui/material/Stack';
import Waves from 'components/Waves';
import EastIcon from '@mui/icons-material/East';
import Wizard from 'components/Wizard/Wizard';
import WizzardProvider from 'providers/WizzardProvider';

// Steps
import Personal from './steps/Personal';
import Address from './steps/Address';
import Contact from './steps/Contact';

const steps = new Map([
  [0, { label: 'Personal', Element: Personal, error: false }],
  [1, { label: 'Address', Element: Address, error: false }],
  [2, { label: 'Contact', Element: Contact, error: false }],
]);

export default function POC() {
  const [started, setStarted] = useState(true);
  return (
    <>
      {!started && (
        <Waves>
          <StartGrid>
            <Stack>
              <StartTitle>
                Welcome to the Least Boring Onboarding Wizard, Ever!
              </StartTitle>
              <StartContentWrapper>
                <StartSubtitle>
                  Get ready for an onboarding experience so fun, you'll forget
                  you're actually doing something productive. Strap in!
                </StartSubtitle>
                <Button
                  color="secondary"
                  endIcon={
                    <EastIcon sx={{ mb: '2px', ml: '4px' }} fontSize="small" />
                  }
                  onClick={() => setStarted(true)}
                  sx={{ width: 'max-content', height: '48px' }}
                  variant="contained"
                >
                  Get Started
                </Button>
              </StartContentWrapper>
            </Stack>
          </StartGrid>
        </Waves>
      )}
      {started && (
        <WizzardProvider steps={steps}>
          <Grid>
            <Main>
              <Wizard />
            </Main>
            <Leading />
            <Trailing />
          </Grid>
        </WizzardProvider>
      )}
    </>
  );
}
