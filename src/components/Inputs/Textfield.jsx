import { useRef, useState } from 'react';
import { hasValue } from 'helpers/utils';
import { useTheme } from '@mui/material/styles';
import {
  ErrorTransitionWrapper,
  InputField,
  InputName,
  InputWrapper,
  InputErrorText,
  InputHintText,
} from './Styles';
import { CSSTransition } from 'react-transition-group';
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
  animateError = true,
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
  const theme = useTheme();
  const errorRef = useRef();
  const [prevError, setPrevError] = useState(false);
  const [showError, setShowError] = useState(false);

  // https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  // We need to adjust some state. Specifically, we need to know when the error
  // prop changes. This is because we want to animate the error text in and out.
  // Storing information from the previous render is a good way to do this.
  // We start then by updating the previous error state to the current error state.
  // When they are not the same. Then we do another if statement to check if the
  // error is true and if it wasn't true before. If so,
  // we set the show error state to true.
  if (!!error !== prevError) {
    setPrevError(!!error);
  }

  if (!!error && !!error !== prevError) {
    setShowError(true);
  }

  return (
    <CSSTransition
      in={!!error}
      timeout={theme.transitions.duration.shorter}
      classNames="error-text"
      nodeRef={errorRef}
      onExited={() => {
        setShowError(false);
      }}
    >
      <InputWrapper>
        <InputName required={isRequired} shrink htmlFor={id}>
          {label}
        </InputName>
        <InputField
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
        {/* If no animation is needed this will show an error right away. */}
        {!animateError && error && <InputErrorText>{error}</InputErrorText>}
        {animateError && showError && (
          <ErrorTransitionWrapper ref={errorRef}>
            <InputErrorText>{error}</InputErrorText>
          </ErrorTransitionWrapper>
        )}
        {hint && !hasValue(error) && <InputHintText>{hint}</InputHintText>}
        {/* Propbably don't want this if we are animating errors. */}
        {gutter && !hasValue(error) && !hasValue(hint) && (
          <InputHintText>&nbsp;</InputHintText>
        )}
      </InputWrapper>
    </CSSTransition>
  );
}

Textfield.propTypes = {
  animateError: PropTypes.bool,
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
