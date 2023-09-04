import { alpha, styled } from '@mui/material/styles';
import { hasValue } from '../../helpers/utils';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import NativeSelect from '@mui/material/NativeSelect';

export const StyledNativeSelect = styled(NativeSelect)(({ theme }) => ({
  '& .MuiNativeSelect-select': {
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    transition: theme.transitions.create([
      'background-color',
      'border',
      'box-shadow',
    ]),
    '&:focus': {
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
    },
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.05),
    },
  },
}));

export const ErrorTransitionWrapper = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  '&.error-text-enter': {
    display: 'block',
    opacity: 0,
    maxHeight: '0px',
  },

  '&.error-text-enter-active': {
    opacity: 1,
    maxHeight: '24px',
    transition: `opacity ${theme.transitions.duration.shorter}ms ease-in, max-height ${theme.transitions.duration.shorter}ms ease-in`,
  },

  '&.error-text-exit': {
    opacity: 1,
    maxHeight: '24px',
  },

  '&.error-text-exit-active': {
    opacity: 0,
    maxHeight: '0px',
    transition: `opacity ${theme.transitions.duration.shorter}ms ease-out, max-height ${theme.transitions.duration.shorter}ms ease-out`,
  },
}));

export const InputErrorText = styled((props) => (
  <Typography variant="caption" {...props} />
))(({ theme }) => ({
  color: theme.palette.error.main,
  marginTop: theme.spacing(1),
  marginLeft: theme.spacing(1),
}));

export const InputHintText = styled((props) => (
  <Typography variant="caption" {...props} />
))(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginTop: theme.spacing(1),
  marginLeft: theme.spacing(1),
}));

export const InputGutter = styled((props) => <Box {...props} />)(
  ({ theme }) => ({
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    height: '24px',
  })
);

export const InputWrapper = styled((props) => (
  <FormControl variant="standard" {...props} />
))(({ theme }) => ({
  //   '& .MuiFormLabel-root': {
  //     color: theme.palette.primary.main,
  //     '&.Mui-focused': {
  //       color: theme.palette.primary.light,
  //     },
  //   },
  //   '& .MuiInputBase-input': {
  //     color: theme.palette.primary.main,
  //     '&.Mui-focused': {
  //       color: theme.palette.primary.light,
  //     },
  //   },
}));

export const InputName = styled((props) => <InputLabel {...props} />)(
  ({ theme }) => ({
    ...theme.typography.subtitle1,
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.primary.main,
    '&.Mui-focused': {
      color: theme.palette.primary.light,
    },
  })
);

// BootstrapInput is styled after the old Bootstrap 3.x form elements
export const InputField = styled((props) => (
  // If desired we can pass inputProps={{ autoComplete: 'off' }} to the InputBase
  // defaultValue="react-bootstrap"
  // component to disable autocomplete
  <InputBase {...props} />
))(({ theme, width, fullWidth = true }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    // backgroundColor: theme.palette.mode === 'light' ? '#F3F6F9' : '#1A2027',
    border: '1px solid',
    borderColor: theme.palette.primary.main,
    // borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
    fontSize: 16,
    width: fullWidth ? '100%' : hasValue(width) ? width : 'auto',
    padding: theme.spacing(1),
    'input:-internal-autofill-selected': {
      backgroundColor: theme.palette.background.paper,
    },
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.light, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.light,
      backgroundColor: theme.palette.background.paper,
    },
    // Not doing this for now, but this is how to change the font
    // Use the system font instead of the default Roboto font.
    //   fontFamily: [
    //     '-apple-system',
    //     'BlinkMacSystemFont',
    //     '"Segoe UI"',
    //     'Roboto',
    //     '"Helvetica Neue"',
    //     'Arial',
    //     'sans-serif',
    //     '"Apple Color Emoji"',
    //     '"Segoe UI Emoji"',
    //     '"Segoe UI Symbol"',
    //   ].join(','),
  },
}));
