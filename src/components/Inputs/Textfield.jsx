import { hasValue } from 'helpers/utils';
import {
  StyledInput,
  StyledInputLabel,
  StyledFormControl,
  StyledErrorText,
  StyledHintText,
  StyledGutter,
} from './Styles';
import PropTypes from 'prop-types';

/**
 * A text field component that renders a label, input, and optional error and hint text.
 * @param {Object} props - The props object.
 * @param {string} [props.error] - The error message to display for the text field.
 * @param {boolean} [props.gutter] - Whether to display a gutter below the text field.
 * @param {string} [props.hint] - The hint text to display for the text field.
 * @param {string} props.id - The ID of the text field.
 * @param {function} props.inputRef - The ref for the text field.
 * @param {string} props.label - The label for the text field.
 * @param {function} [props.onBlur] - The blur event handler for the text field.
 * @param {function} [props.onChange] - The change event handler for the text field.
 * @param {boolean} [props.required] - Whether the text field is required.
 * @returns {JSX.Element} - The text field component.
 */
export default function Textfield({
  error,
  gutter,
  hint,
  id,
  inputRef: ref,
  label,
  onBlur: handleBlur,
  onChange: handleChange,
  required: isRequired,
  ...props
}) {
  return (
    <StyledFormControl>
      <StyledInputLabel required={isRequired} shrink htmlFor={id}>
        {label}
      </StyledInputLabel>
      <StyledInput
        id={id}
        inputProps={{
          maxLength: props?.maxLength > 0 ? props.maxLength : null,
        }}
        inputRef={ref}
        name={label}
        onBlur={handleBlur}
        onChange={handleChange}
        {...props}
      />
      {error && <StyledErrorText>{error}</StyledErrorText>}
      {hint && !hasValue(error) && <StyledHintText>{hint}</StyledHintText>}
      {gutter && !hasValue(error) && !hasValue(hint) && (
        <StyledHintText>&nbsp;</StyledHintText>
      )}
    </StyledFormControl>
  );
}

Textfield.propTypes = {
  error: PropTypes.string,
  gutter: PropTypes.bool,
  hint: PropTypes.string,
  id: PropTypes.string.isRequired,
  inputRef: PropTypes.any.isRequired,
  label: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  required: PropTypes.bool,
};
