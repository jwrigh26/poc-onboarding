import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import PropTypes from 'prop-types';

export default function Textfield({ id, label, ...props }) {
  return (
    <FormControl variant="standard">
      <StyledInputLabel shrink htmlFor={id}>
        {label}
      </StyledInputLabel>
      <BootstrapInput id={id} {...props} />
    </FormControl>
  );
}

Textfield.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

const StyledInputLabel = styled((props) => <InputLabel {...props} />)(
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
const BootstrapInput = styled((props) => (
  //   <InputBase
  //     defaultValue="ted"
  //     inputProps={{ autoComplete: 'off' }}
  //     {...props}
  //   />
  <InputBase {...props} />
))(({ theme }) => ({
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
    width: 'auto',
    padding: theme.spacing(1),
    'input:-internal-autofill-selected': {
      backgroundColor: theme.palette.background.paper,
    },
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
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
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.light, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.light,
      backgroundColor: theme.palette.background.paper,
    },
    // 'input:-webkit-autofill': overrides,
    // 'input:-webkit-autofill:hover': overrides,
    // 'input:-webkit-autofill:focus': overrides,
    // 'input:-webkit-autofill:active': overrides,
    // 'input:-internal-autofill-selected': overrides,
    // WebkitBoxShadow: `0 0 0 100px ${theme.palette.background.default} inset !important`,
    // WebkitTextFillColor: `${theme.palette.text.primary} !important`,
    WebkitText: {
      backgroundColor: 'yellow',
    },
  },
}));

const overrides = {
  //   WebkitBackgroundClip: 'text',
  webkitTextFillColor: '#ffffff',
  transition: 'background-color 5000s ease-in-out 0s',
  boxShadow: 'inset 0 0 20px 20px #23232329',
  backgroundColor: 'pink !important',
};

// input:-webkit-autofill,
// input:-webkit-autofill:hover,
// input:-webkit-autofill:focus,
// input:-webkit-autofill:active{
//     -webkit-background-clip: text;
//     -webkit-text-fill-color: #ffffff;
//     transition: background-color 5000s ease-in-out 0s;
//     box-shadow: inset 0 0 20px 20px #23232329;
// }

// input:-webkit-autofill,
// input:-webkit-autofill:hover,
// input:-webkit-autofill:focus,
// textarea:-webkit-autofill,
// textarea:-webkit-autofill:hover,
// textarea:-webkit-autofill:focus,
// select:-webkit-autofill,
// select:-webkit-autofill:hover,
// select:-webkit-autofill:focus {
//   border: 1px solid green;
//   -webkit-text-fill-color: green;
//   -webkit-box-shadow: 0 0 0px 1000px #000 inset;
//   transition: background-color 5000s ease-in-out 0s;
// }
