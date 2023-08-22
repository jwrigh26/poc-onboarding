import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import FooterContent from 'components/Footer';
import HeaderContent from 'components/Header';
import Stack from '@mui/material/Stack';

function App() {
  const isLoggedIn = true;
  const isAdmin = false;
  return (
    <>
      {!isLoggedIn && (
        <Root>
          <Auth>
            <AuthGrid>
              <Leading>Splah Content</Leading>
              <Trailing>Auth Content</Trailing>
            </AuthGrid>
          </Auth>
        </Root>
      )}
      {isLoggedIn && !isAdmin && (
        <Root>
          <User>
            <Header>
              <HeaderContent />
            </Header>
            <Main>
              <>{''}</>
            </Main>
            <FooterWrapper>
              <FooterContent />
            </FooterWrapper>
          </User>
        </Root>
      )}
    </>
  );
}

export default App;

// App Styled Components

// This isn't the root of the html document, but the root of the React app
// Where all the other components are rendered
const Root = styled(Box)(({ theme }) => ({
  display: 'flex',
  //   backgroundColor: theme.palette.primary.main,
  //   backgroundColor: theme.palette.primary.customScale[700],
  backgroundColor: theme.palette.background.paper,
}));

const Main = styled((props) => <Box component="main" {...props} />)(
  ({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  })
);

const Header = styled((props) => <Box component="header" {...props} />)(
  ({ theme }) => ({
    // backgroundColor: theme.palette.primary.main,
    ...theme.shape.backgroundGradient,
  })
);

const FooterWrapper = styled((props) => <Box component="footer" {...props} />)(
  ({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    marginTop: 'auto',
  })
);

// Auth Styled Components
const Auth = styled((props) => (
  <Stack id="aberdeen-advisory-onboarding-auth" {...props} />
))(({ theme }) => ({
  flexGrow: 1, // This works based on AppWrapper's flex display
  minHeight: '100svh', // Full viewport height
  maxWidth: theme.breakpoints.values.lg,
  margin: '0 auto',
}));

const AuthGrid = styled((props) => <Box component="main" {...props} />)(() => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
}));

// Used for both Leading and Trailing
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

// User Styled Components
const User = styled((props) => (
  <Stack id="aberdeen-advisory-onboarding-main" {...props} />
))(({ theme }) => ({
  flexGrow: 1, // This works based on User Root's flex display
  minHeight: '100svh', // Full viewport height

  margin: '0 auto',
  backgroundColor: theme.palette.background.paper,
}));

// Admin Styled Components
