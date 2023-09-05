import { hasValue, isString } from 'helpers/utils';
import { useRef } from 'react';
import { useWizardInputHandler } from 'hooks/useWizardInputHandler';
import NumberTextfield from 'components/Inputs/NumberTextfield';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Select from 'components/Inputs/Select';
import Textfield from 'components/Inputs/Textfield';
import WizardButtons from 'components/Wizard/WizardButtons';
import { statesOptionList } from 'assets/states';

export default function Address({ index }) {
  const {
    disabled,
    getError,
    handleBlur,
    handleChange,
    handleSelect,
    isValid,
    validationRef,
  } = useWizardInputHandler(
    index,
    [
      ADDRESS.ADDRESS,
      ADDRESS.ADDRESS2,
      ADDRESS.CITY,
      ADDRESS.STATE,
      ADDRESS.ZIP,
    ],
    validationCallback
  );
  return (
    <>
      <Stack sx={{ mt: 2, gap: 2 }}>
        <Textfield
          error={getError(ADDRESS.ADDRESS)}
          id={ADDRESS.ADDRESS}
          label="Address"
          onBlur={handleBlur(ADDRESS.ADDRESS)}
          onChange={handleChange(ADDRESS.ADDRESS)}
          placeholder="Enter your address"
          required
          validationRef={validationRef}
        />
        <Textfield
          error={getError(ADDRESS.ADDRESS2)}
          id={ADDRESS.ADDRESS2}
          label="Apt, Suite, Bldg. (optional)"
          onBlur={handleBlur(ADDRESS.ADDRESS2)}
          onChange={handleChange(ADDRESS.ADDRESS2)}
          validationRef={validationRef}
        />
        <Textfield
          error={getError(ADDRESS.CITY)}
          id={ADDRESS.CITY}
          label="City"
          onBlur={handleBlur(ADDRESS.CITY)}
          onChange={handleChange(ADDRESS.CITY)}
          placeholder="Enter your city"
          required
          validationRef={validationRef}
        />
        <Select
          error={getError(ADDRESS.STATE)}
          id={ADDRESS.STATE}
          label="State"
          onChange={handleSelect(ADDRESS.STATE)}
          options={statesOptionList}
          required
          validationRef={validationRef}
        />
        <NumberTextfield
          error={getError(ADDRESS.ZIP)}
          formatType="zipcode"
          id={ADDRESS.ZIP}
          label="ZIP Code"
          maxLength={5}
          onBlur={handleBlur(ADDRESS.ZIP)}
          onChange={handleChange(ADDRESS.ZIP)}
          placeholder="Enter your ZIP Code"
          required
          validationRef={validationRef}
        />
      </Stack>
      <WizardButtons
        disabled={disabled}
        index={index}
        isValid={isValid}
        validationRef={validationRef}
      />
    </>
  );
}

Address.propTypes = {
  index: PropTypes.number.isRequired,
};

const ADDRESS = {
  ADDRESS: 'address',
  ADDRESS2: 'address2',
  CITY: 'city',
  STATE: 'state',
  ZIP: 'zip',
};

const validationCallback = (id, value) => {
  let error = null;

  // Regex for ZIP code validation (U.S)
  const zipRegex = /^[0-9]{5}(?:-[0-9]{4})?$/;

  switch (id) {
    case ADDRESS.ADDRESS:
      if (!hasValue(value)) {
        error = 'Address is required';
      }
      break;

    case ADDRESS.ADDRESS2:
      // No required validation, as this is optional
      break;

    case ADDRESS.CITY:
      if (!hasValue(value) || !isString(value)) {
        error = 'Valid city name is required';
      }
      break;

    case ADDRESS.STATE:
      if (!hasValue(value) || value?.length !== 2) {
        error = 'Valid state abbreviation is required';
      }
      break;

    case ADDRESS.ZIP:
      if (!hasValue(value) || !zipRegex.test(value)) {
        error = 'Valid ZIP code is required';
      }
      break;

    default:
      break;
  }

  return error;
};
