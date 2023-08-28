import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**
 * Start Page styles start here
 */
export const StartTitle = styled((props) => (
  <Typography gutterBottom variant="h1" {...props} />
))(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  color: theme.palette.text.primary,
  textWrap: 'balance',
}));

export const StartSubtitle = styled((props) => (
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

export const StartGrid = styled((props) => <Box component="main" {...props} />)(
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

export const StartContentWrapper = styled((props) => <Box {...props} />)(
  ({ theme }) => ({
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
  })
);

/**
 *
 * POC Step styles start here
 */

export const Grid = styled((props) => <Box component="main" {...props} />)(
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

export const Main = styled((props) => <Box {...props} />)(({ theme }) => ({
  gridArea: 'main',
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
}));

export const Leading = styled((props) => <Box component="aside" {...props} />)(
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

export const Trailing = styled((props) => <Box component="aside" {...props} />)(
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
