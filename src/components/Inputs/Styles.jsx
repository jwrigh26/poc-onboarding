import { alpha, styled } from '@mui/material/styles';
import { hasValue } from '../../helpers/utils';
import FormControl from '@mui/material/FormControl';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';

export const StyledFormControl = styled((props) => (
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

export const StyledInputLabel = styled((props) => <InputLabel {...props} />)(
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
export const StyledInput = styled((props) => (
  // If desired we can pass inputProps={{ autoComplete: 'off' }} to the InputBase
  // defaultValue="react-bootstrap"
  // component to disable autocomplete
  <InputBase {...props} />
))(({ theme, fullWidth, width }) => ({
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
