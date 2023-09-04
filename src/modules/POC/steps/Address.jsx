import { hasValue, isString } from 'helpers/utils';
import { useRef } from 'react';
import { useWizardInputHandler } from 'hooks/useWizardInputHandler';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Select from 'components/Inputs/Select';
import WizardButtons from 'components/Wizard/WizardButtons';
import { statesOptionList } from 'assets/states';

export default function Address({ index }) {
  const inputRef = useRef([]);

  const { disabled, getError, handleSelect, isValid } = useWizardInputHandler(
    index,
    [ADDRESS.STATE],
    inputRef,
    validationCallback
  );
  return (
    <>
      <Stack sx={{ mt: 2, gap: 2 }}>
        <Select
          error={getError(ADDRESS.STATE)}
          id={ADDRESS.STATE}
          label="State"
          inputRef={(el) => (inputRef.current[ADDRESS.STATE] = el)}
          onChange={handleSelect}
          options={statesOptionList}
        />
      </Stack>
      <WizardButtons
        disabled={disabled}
        index={index}
        inputRef={inputRef}
        isValid={isValid}
      />
    </>
  );
}

Address.propTypes = {
  index: PropTypes.number.isRequired,
};

const ADDRESS = {
  STATE: 'address-state',
};

const validationCallback = (id, value) => {
  let error = null;
  switch (id) {
    case ADDRESS.STATE:
      if (value?.length > 2) {
        console.log('ValidationCallback', id, value);
        error = 'State must be less than 2 characters';
      }
      break;
    default:
      break;
  }
};
