import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { min } from 'date-fns';

function App() {
  return (
    <AppWrapper>
      <PageWrapper>
        <Main>
          <Leading>Splah Content</Leading>
          <Trailing>Auth Content</Trailing>
        </Main>
      </PageWrapper>
    </AppWrapper>
  );
}

export default App;

const AppWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  backgroundColor: theme.palette.primary.main,
}));

const PageWrapper = styled((props) => (
  <Stack id="aberdeen-advisory-onboarding-auth" {...props} />
))(({ theme }) => ({
  flexGrow: 1, // This works based on AppWrapper's flex display
  minHeight: '100svh', // Full viewport height
  maxWidth: theme.breakpoints.values.lg,
  margin: '0 auto',
}));

const Main = styled((props) => <Box component="main" {...props} />)(() => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
}));

const FullHeightFlexCenter = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  [theme.breakpoints.up('lg')]: {
    height: 'auto',
    paddingTop: 'min(30vh, 420px)',
    paddingBottom: 'min(30vh, 420px)',
  },
}));

const Leading = styled(FullHeightFlexCenter)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.common.white,
}));

const Trailing = styled(FullHeightFlexCenter)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
}));
