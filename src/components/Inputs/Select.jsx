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
// import MUISelect from '@mui/material/Select';
// import NativeSelect from '@mui/material/NativeSelect';

export default function Select({
  animateError = true,
  defaultValue,
  error,
  gutter,
  hint,
  id,
  inputRef: ref,
  label,
  onBlur: handleBlur,
  onChange: handleChange,
  options = [{ label: 'None', value: '' }],
  required: isRequired,
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
        <NativeSelect
          id={id}
          input={<InputField id={id} inputRef={ref} name={label} />}
          inputProps={{
            maxLength: props?.maxLength > 0 ? props.maxLength : 128,
          }}
          onChange={handleChange}
          defaultValue={defaultValue || ''}
          {...props}
        >
          <option aria-label="None" value="" />
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </NativeSelect>
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

Select.propTypes = {
  animateError: PropTypes.bool,
  defaultValue: PropTypes.any,
  error: PropTypes.string,
  gutter: PropTypes.bool,
  hint: PropTypes.string,
  id: PropTypes.string.isRequired,
  inputRef: PropTypes.any.isRequired,
  label: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,
    })
  ),
  required: PropTypes.bool,
};
