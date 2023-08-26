import { StyledInput, StyledInputLabel, StyledFormControl } from './Styles';
import PropTypes from 'prop-types';

export default function Textfield({ id, label, ...props }) {
  return (
    <StyledFormControl>
      <StyledInputLabel shrink htmlFor={id}>
        {label}
      </StyledInputLabel>
      <StyledInput id={id} {...props} />
    </StyledFormControl>
  );
}

Textfield.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
