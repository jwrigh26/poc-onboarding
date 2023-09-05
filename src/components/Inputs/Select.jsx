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
  StyledNativeSelect as NativeSelect,
} from './Styles';
import { CSSTransition } from 'react-transition-group';
import MenuItem from '@mui/material/MenuItem';
import PropTypes from 'prop-types';
import MUISelect from '@mui/material/Select';

/**
 * Select is an uncontrolled MUI Select component which allows a user to select from
 * a list of options.
 *
 * @param {Object} props - Props passed down from parent component
 * @param {string} props.error - Error text to display
 * @param {boolean} [props.gutter] - Whether to display a gutter below the text field.
 * @param {string} props.hint - Hint text to display
 * @param {string} props.id - Unique ID for the input
 * @param {string} props.label - Label text for the input
 * @param {function} [props.onChange] - Change event handler for the select options
 * @param {boolean} [props.required] - Whether the input is required
 * @param {function} props.validationRef - The ref for keeping track of wizard/form validation.
 * @returns {JSX.Element} The select field component.
 */
export default function Select({
  animateError = true,
  defaultValue,
  error,
  gutter,
  hint,
  id,
  label,
  onChange: handleChange,
  options = [{ label: 'None', value: '' }],
  required: isRequired,
  validationRef,
  ...props
}) {
  const theme = useTheme();
  const errorRef = useRef();
  const [prevError, setPrevError] = useState(false);
  const [showError, setShowError] = useState(false);

  if (!!error !== prevError) {
    setPrevError(!!error);
  }

  if (!!error && !!error !== prevError) {
    setShowError(true);
  }

  const [selectedOption, setSelectedOption] = useState('');

  const handlePrivateChange = (event) => {
    setSelectedOption(event.target.value);

    if (validationRef.current[id]) {
      validationRef.current[id].value = event.target.value;
      handleChange(validationRef.current[id]);
    }
  };

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
        <MUISelect
          id={id}
          input={<InputField id={id} name={label} />}
          inputProps={{
            maxLength: props?.maxLength > 0 ? props.maxLength : 128,
          }}
          onChange={handlePrivateChange}
          defaultValue={defaultValue || ''}
          value={selectedOption}
          {...props}
        >
          <MenuItem aria-label="None" value="" />
          {options.map((option, index) => (
            <MenuItem key={index} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </MUISelect>
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
        <input
          type="hidden"
          name={id}
          ref={(el) => (validationRef.current[id] = el)}
        />
      </InputWrapper>
    </CSSTransition>
  );
}

Select.propTypes = {
  animateError: PropTypes.bool,
  defaultValue: PropTypes.any,
  error: PropTypes.string,
  gutter: PropTypes.bool,
  hint: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,
    })
  ),
  required: PropTypes.bool,
  validationRef: PropTypes.any.isRequired,
};
