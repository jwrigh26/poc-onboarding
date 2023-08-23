import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from 'components/Button';
import Stack from '@mui/material/Stack';
import Waves from 'components/Waves';
import Typography from '@mui/material/Typography';
import EastIcon from '@mui/icons-material/East';

export default function POC() {
  return (
    <Waves>
      <POCGrid>
        <Stack>
          <Title>Embark on Precision! Your Financial Future Starts Here.</Title>
          <Wrapper>
            <Subtitle>
              Welcome to a journey tailored for accuracy and insight. Our
              onboarding process is designed to align with your unique financial
              goals, ensuring a clear path to success. Let's make numbers tell
              your story!
            </Subtitle>
            <Button
              color="secondary"
              sx={{ width: 'max-content', height: '48px' }}
              endIcon={
                <EastIcon sx={{ mb: '3px', ml: '4px' }} fontSize="small" />
              }
            >
              Get Started
            </Button>
          </Wrapper>
        </Stack>
      </POCGrid>
    </Waves>
  );
}

const Title = styled((props) => (
  <Typography gutterBottom variant="h1" {...props} />
))(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  color: theme.palette.text.primary,
  textWrap: 'balance',
}));

const Subtitle = styled((props) => (
  <Typography variant="body1" component="span" {...props} />
))(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: theme.typography.fontWeightMedium,
  paddingLeft: theme.spacing(0),
  paddingRight: theme.spacing(0),
  flex: 1,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

const POCGrid = styled((props) => <Box component="main" {...props} />)(
  ({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '1fr',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    maxWidth: theme.breakpoints.values.lg,
    margin: '0 auto',
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8),
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  })
);

const Wrapper = styled((props) => <Box {...props} />)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  flexDirection: 'column',
  gap: theme.spacing(4),
  maxWidth: theme.breakpoints.values.md,
  [theme.breakpoints.up('lg')]: {
    marginTop: theme.spacing(2),
    gap: theme.spacing(8),
    flexDirection: 'row',
  },
}));
