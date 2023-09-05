import { useCallback, useRef, useState } from 'react';
import { useWizzardContext } from 'providers/WizzardProvider';
import { useDebounce } from 'hooks/useDebounce';
import { hasValue } from '../helpers/utils';
/**
 * Custom hook to handle input changes and validation inside a wizard.
 * @param {Number} step - The current step of the wizard. Note: it may  not always be the active step.
 * @param {Array} ids - Array of input IDs to validate.
 * @param {Function} validationCallback - Function that takes an input id and its value as arguments,
 *                                        returns an error message string if the input is invalid,
 *                                        or null if the input is valid.
 * @returns {Object} - Returns an object containing:
 *                      - disabled (boolean): Flag to indicate if the form is not valid.
 *                      - getError (function): Function to get the error message for a given id.
 *                      - handleBlur (function): Function to handle the onBlur event.
 *                      - handleChange (function): Function to handle the onChange event.
 *                      - isValid (function): Function to validate the entire form.
 *                     - validationRef (object): React ref object pointing to the input elements.
 *
 * This hook makes use of a context to share state across Wizard steps.
 * The hook maintains two pieces of state, `errors` and `dirty`. The `errors` object keeps
 * track of validation messages, and `dirty` object keeps track of whether an input field
 * has been touched. Validation is triggered on the `onBlur` event and then continually on
 * `onChange` if the input is marked dirty.
 *
 * The hook leverages memoization (useCallback) and debouncing for performance optimization.
 */
export const useWizardInputHandler = (step, ids, validationCallback) => {
  // - A React ref object pointing to the input elements.
  const validationRef = useRef({});
  const { actions, state } = useWizzardContext();

  // Grab inputErrors from activeStep to help with persisting errors from step to step
  const activeStep = state?.steps.get(state.activeStep || 0);
  const inputErrors = activeStep?.inputErrors ?? {};
  // convert input errors into index/boolean to help persist dirty state too.
  const inputErroBooleans = Object.keys(inputErrors).reduce((acc, key) => {
    acc[key] = !!inputErrors[key];
    return acc;
  }, {});

  // Object of key/value ( booleans ) to track if an input has been dirtied
  // dirty looks like this: { id: true }
  const [dirty, setDirty] = useState(inputErroBooleans);

  // Helper method to get the error for a given id
  // It takes an id and a string used as a error message
  const getError = (id) => {
    return inputErrors?.[id] || null;
  };

  /**
   * Checks all inputs for errors
   * @param {Object} options
   * @returns {Boolean} isValid
   */
  const isValid = (options) => {
    const { dirty = false } = options || {};
    // Helper method to validate all inputs
    // It uses the ids array to run a some loop through all inputs
    // It then uses the validationCallback to check if the input is valid
    // If the input is true it breaks out of the loop and returns true
    // True meaning it's valid!
    // Note:
    // -- Something to note is the validationCallback returns an error message if the input is invalid
    // -- If the input is valid it returns null
    // -- This is opposite of what we want for isValid

    // ------------
    // check if at least one input has an error message
    // We'll break out of the loop if we find an error
    // hasValidationError will be true if at least one input has an error
    // Down below we return the opposite of hasValidationError
    // To say the form is valid if no errors are found

    let filteredIds = ids;

    if (dirty) {
      filteredIds = ids.filter((id) => dirty[id]);
    }

    // Finds the first input that has an error from the validationRef object of inputs
    const hasValidationError = filteredIds?.some((id) => {
      const value = validationRef.current[id]?.value;
      // console.log('isValid validationError id: ', id, 'value', value);
      const validationError = validationCallback(id, value);
      const hasError = hasValue(validationError);
      return hasError;
    });

    console.log('hasValidationError', hasValidationError);

    // Return opposite of hasValidationError for isValid
    return !hasValidationError;
  };

  // Used to check if the form is valid. It's returned and used in the component
  // to keep the submit button disabled until the Wizard Step is valid
  // Note:
  // -- down below we return !allInputsValid as disabled to make it easier to read
  // -- and pass to the submit button's disabled prop
  const [disabled, setDisabled] = useState(true);

  // Helper method to handle disabling the submit button or enabling it
  const handleDisable = (event) => {
    // Guard: if no event or event.target bail
    if (!event?.target) return;
    // Disable default behavior to prevent page reload
    event.preventDefault();

    // console.log('Event', event.type, event.target.id, event.target.value);
    // Run to see if the form is valid or not. If not then set disabled to true
    // to prevent the user from submitting the form aka continuing the wizard
    setDisabled(!isValid());
  };

  const handleInput = (event) => {
    // Guard: if no event or event.target bail
    if (!event?.target) return;
    // Disable default behavior to prevent page reload
    event.preventDefault();

    // Note: We could have targeted the id and value
    // by calling validationRefcurrent[id]?.value etc.
    // but by calling event.target we ensure we get the latest value
    const { id, value } = event.target;
    // Run the validation callback to check if the input is valid
    const validationError = validationCallback(id, value);

    // Update context input error to persist from step to step
    actions.setInputError(id, validationError);
    actions.setStepError(!!validationError);
  };

  const handleSelect = useCallback(
    (id) => (ref) => {
      console.log('HandleSelect', { id, value: ref?.value });
      const validationError = validationCallback(id, ref?.value);

      // Update context input error to persist from step to step
      actions.setInputError(id, validationError);
      actions.setStepError(!!validationError);
      setDisabled(!isValid());
    },
    []
  );

  // Some background context on how inputs behave in this application.
  // We run validation on blur first, when the user leaves the input
  // If the input is invalid we show an error message
  // at the same time we set the input to dirty to say it's been touched
  // Marking it dirty will allow handleChange to run validation on change

  // Takes the id and returns a function that takes an event
  // It calls handleInput and passes the event
  // It also checks if the input is dirty, if not it sets it to dirty
  // Note:
  // -- We use useCallback to memoize the function
  // -- We pass the id to useCallback so it's not recreated on every render
  // -- For handleBlur we could have dervived the id from event.target.id
  // -- but we wanted to create consistency between handleBlur and handleChange
  // -- handChange takes the id as an argument because it's needed for making
  // -- sure the debounced function is called with the correct id
  const handleBlur = useCallback(
    (id) => (event) => {
      handleInput(event);
      // Let's check if we should dirty the input
      // We only want to dirty if the input on blur is valid
      // Guard: first check if dirty, if dirty we bail.
      if (dirty[id]) return;
      // If not dirty, set dirty to true
      setDirty((prevDirty) => ({
        ...prevDirty,
        [id]: true,
      }));
      handleDisable(event);
    },
    []
  );

  // We use debounce to prevent the validation callback from running on every change
  // This helps with performance and prevents excessive re-renders
  const handleDebouncedInput = useDebounce(handleInput);

  // We do this in handleBlur but we also want to do it in handleChange
  // so debounced validation is run on every change
  const handleDebouncedValidation = useDebounce(handleDisable);

  // Takes the id and returns a function that takes an event
  // It calls handleDebouncedInput and passes the event
  // handleDebouncedInput is a debounced version of handleInput,
  // but only if the input is dirty

  // Note:
  // We have a dynamic dependency array for useCallback
  // that needs to be re-evaluated on every time handleChange is called
  const handleChange = (id) =>
    useCallback(
      (event) => {
        // Next if the input is dirty, run the debounced input
        if (dirty[event.target?.id]) {
          handleDebouncedInput(event);
        }
        handleDebouncedValidation(event);
      },
      [dirty[id]]
    );

  // disabled is the opposite of allInputsValid to make it easy to use for buttons
  // isValid is used to check if the Wizard Step is valid
  return {
    disabled,
    getError,
    handleBlur,
    handleChange,
    handleSelect,
    isValid,
    validationRef,
  };
};
