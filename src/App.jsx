import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

function App() {
  return (
    <AppWrapper>
      <PageWrapper>
        <Header>
          <Item>Top</Item>
        </Header>
        <Main>
          <Item>Content</Item>
        </Main>
        <Footer>
          <Item>Footer</Item>
        </Footer>
      </PageWrapper>
    </AppWrapper>
  );
}

export default App;

const Item = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.light,
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const AppWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  backgroundColor: theme.palette.primary.light,
}));

const PageWrapper = styled((props) => (
  <Stack id="onboarding-main" {...props} />
))(({ theme }) => ({
  flexGrow: 1, // This works based on AppWrapper's flex display
  minHeight: '100svh', // Full viewport height
  maxWidth: '1280px',
  margin: '0 auto',
  backgroundColor: theme.palette.background.paper,
}));

const Main = styled((props) => <Box component="main" {...props} />)(
  ({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  })
);

const Header = styled((props) => <Box component="header" {...props} />)(
  ({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
  })
);

const Footer = styled((props) => <Box component="footer" {...props} />)(
  ({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 'auto',
  })
);
