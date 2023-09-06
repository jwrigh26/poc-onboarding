import { hasValue, isString } from 'helpers/utils';
import { statesOptionList } from 'assets/states';
import { useRef } from 'react';
import { useWizardInputHandler } from 'hooks/useWizardInputHandler';
import NumberTextfield from 'components/Inputs/NumberTextfield';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Select from 'components/Inputs/Select';
import Textfield from 'components/Inputs/Textfield';
import WizardButtons from 'components/Wizard/WizardButtons';

export default function Address({ index }) {
  const {
    disabled,
    getError,
    handleBlur,
    handleChange,
    handleSelect,
    isValid,
    validationRef,
  } = useWizardInputHandler({
    ids: [
      ADDRESS_IDS.ADDRESS,
      ADDRESS_IDS.ADDRESS2,
      ADDRESS_IDS.CITY,
      ADDRESS_IDS.STATE,
      ADDRESS_IDS.ZIP,
    ],
    validationCallback,
  });
  return (
    <>
      <Stack sx={{ mt: 2, gap: 2 }}>
        <Textfield
          error={getError(ADDRESS_IDS.ADDRESS)}
          id={ADDRESS_IDS.ADDRESS}
          label="Address"
          onBlur={handleBlur(ADDRESS_IDS.ADDRESS)}
          onChange={handleChange(ADDRESS_IDS.ADDRESS)}
          placeholder="Enter your address"
          required
          validationRef={validationRef}
        />
        <Textfield
          error={getError(ADDRESS_IDS.ADDRESS2)}
          id={ADDRESS_IDS.ADDRESS2}
          label="Apt, Suite, Bldg. (optional)"
          onBlur={handleBlur(ADDRESS_IDS.ADDRESS2)}
          onChange={handleChange(ADDRESS_IDS.ADDRESS2)}
          validationRef={validationRef}
        />
        <Textfield
          error={getError(ADDRESS_IDS.CITY)}
          id={ADDRESS_IDS.CITY}
          label="City"
          onBlur={handleBlur(ADDRESS_IDS.CITY)}
          onChange={handleChange(ADDRESS_IDS.CITY)}
          placeholder="Enter your city"
          required
          validationRef={validationRef}
        />
        <Select
          error={getError(ADDRESS_IDS.STATE)}
          id={ADDRESS_IDS.STATE}
          label="State"
          onChange={handleSelect(ADDRESS_IDS.STATE)}
          options={statesOptionList}
          required
          validationRef={validationRef}
        />
        <NumberTextfield
          error={getError(ADDRESS_IDS.ZIP)}
          formatType="zipcode"
          id={ADDRESS_IDS.ZIP}
          label="ZIP Code"
          maxLength={5}
          onBlur={handleBlur(ADDRESS_IDS.ZIP)}
          onChange={handleChange(ADDRESS_IDS.ZIP)}
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

const ADDRESS_IDS = {
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
    case ADDRESS_IDS.ADDRESS:
      if (!hasValue(value)) {
        error = 'Address is required';
      }
      break;

    case ADDRESS_IDS.ADDRESS2:
      // No required validation, as this is optional
      break;

    case ADDRESS_IDS.CITY:
      if (!hasValue(value) || !isString(value)) {
        error = 'Valid city name is required';
      }
      break;

    case ADDRESS_IDS.STATE:
      if (!hasValue(value) || value?.length !== 2) {
        error = 'Valid state abbreviation is required';
      }
      break;

    case ADDRESS_IDS.ZIP:
      if (!hasValue(value) || !zipRegex.test(value)) {
        error = 'Valid ZIP code is required';
      }
      break;

    default:
      break;
  }

  return error;
};
