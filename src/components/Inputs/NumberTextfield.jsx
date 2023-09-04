import { hasValue } from 'helpers/utils';
import {
  InputField,
  InputName,
  InputWrapper,
  InputErrorText,
  InputHintText,
} from './Styles';
import { NumericFormat, PatternFormat } from 'react-number-format';
import PropTypes from 'prop-types';

/**
 * NumberTextfield is an extension of the Textfield component which allows
 * different number formatting options such as currency, integer and float.
 *
 * @param {Object} props - Props passed down from parent component
 * @param {string} props.error - Error text to display
 * @param {string} props.formatType - Type of number format ('currency', 'integer', 'float')
 * @param {boolean} [props.gutter] - Whether to display a gutter below the text field.
 * @param {string} props.hint - Hint text to display
 * @param {string} props.id - Unique ID for the input
 * @param {function} props.inputRef - Ref for the input
 * @param {string} props.label - Label text for the input
 * @param {function} [props.onBlur] - Blur event handler for the input
 * @param {function} [props.onChange] - Change event handler for the input
 * @param {boolean} [props.required] - Whether the input is required
 * @returns {JSX.Element} A formatted input field based on the specified number format.
 */
export default function NumberTextfield({
  error,
  formatType,
  gutter,
  hint,
  id,
  inputRef: ref,
  label,
  required: isRequired,
  ...props
}) {
  // Custom props for NumericFormat  based on formatType
  let formatProps = {};
  let isPattern = false;
  if (formatType === 'phone') {
    isPattern = true;
  }
  switch (formatType) {
    case 'currency':
      formatProps = {
        prefix: '$',
        decimalScale: 2,
        fixedDecimalScale: true,
        allowNegative: false,
      };
      break;
    case 'integer':
      formatProps = {
        format: '##',
        allowNegative: false,
      };
      break;
    case 'float':
      formatProps = {
        decimalScale: 2,
        allowNegative: false,
      };
      break;
    case 'percent':
      formatProps = {
        suffix: '%',
        decimalScale: 2,
        fixedDecimalScale: true,
        allowNegative: false,
      };
      break;
    case 'phone':
      formatProps = {
        format: '( ### ) ### - ####',
        allowEmptyFormatting: true,
        mask: '_',
      };
      break;
    case 'zipcode':
      formatProps = {
        format: '#####', // Only 5 digits
        allowEmptyFormatting: true,
      };
      break;
    default:
      break;
  }

  return (
    <InputWrapper>
      <InputName required={isRequired} shrink htmlFor={id}>
        {label}
      </InputName>
      {isPattern && (
        <PatternFormat
          customInput={InputField}
          id={id}
          inputProps={{
            maxLength: props?.maxLength > 0 ? props.maxLength : null,
          }}
          inputRef={ref}
          {...formatProps}
          {...props}
        />
      )}
      {!isPattern && (
        <NumericFormat
          customInput={InputField}
          id={id}
          inputProps={{
            maxLength: props?.maxLength > 0 ? props.maxLength : null,
          }}
          inputRef={ref}
          {...formatProps}
          {...props}
        />
      )}
      {error && <InputErrorText>{error}</InputErrorText>}
      {hint && !hasValue(error) && <InputHintText>{hint}</InputHintText>}
      {gutter && !hasValue(error) && !hasValue(hint) && (
        <InputHintText>&nbsp;</InputHintText>
      )}
    </InputWrapper>
  );
}

NumberTextfield.propTypes = {
  error: PropTypes.string,
  formatType: PropTypes.oneOf([
    'currency',
    'integer',
    'float',
    'percent',
    'phone',
    'zipcode',
  ]).isRequired,
  gutter: PropTypes.bool,
  hint: PropTypes.string,
  id: PropTypes.string.isRequired,
  inputRef: PropTypes.any.isRequired,
  label: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
};
