import { StyledInput, StyledInputLabel, StyledFormControl } from './Styles';
import { NumericFormat, PatternFormat } from 'react-number-format';
import PropTypes from 'prop-types';

/**
 * NumberTextfield is an extension of the Textfield component which allows
 * different number formatting options such as currency, integer and float.
 *
 * @param {Object} props - Props passed down from parent component
 * @param {string} props.id - Unique ID for the input
 * @param {string} props.label - Label text for the input
 * @param {string} props.formatType - Type of number format ('currency', 'integer', 'float')
 * @returns {JSX.Element} A formatted input field based on the specified number format.
 */
export default function NumberTextfield({ id, label, formatType, ...props }) {
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
    default:
      break;
  }

  return (
    <StyledFormControl>
      <StyledInputLabel shrink htmlFor={id}>
        {label}
      </StyledInputLabel>
      {isPattern && (
        <PatternFormat
          customInput={StyledInput}
          id={id}
          {...formatProps}
          {...props}
        />
      )}
      {!isPattern && (
        <NumericFormat
          customInput={StyledInput}
          id={id}
          {...formatProps}
          {...props}
        />
      )}
    </StyledFormControl>
  );
}

NumberTextfield.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  formatType: PropTypes.oneOf([
    'currency',
    'integer',
    'float',
    'percent',
    'phone',
  ]).isRequired,
};

// ... Your existing StyledInputLabel and BootstrapInput styled components remain unchanged