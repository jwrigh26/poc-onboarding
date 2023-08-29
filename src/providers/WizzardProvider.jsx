import { removeItem } from 'helpers/utils';
import {
  useCallback,
  createContext,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import PropTypes from 'prop-types';

const ACTION_TYPES = {
  ACTIVE_STEP: 'activeStep',
  NEXT: 'next',
  BACK: 'back',
  RESET: 'reset',
  COMPLETE: 'complete',
  UNCOMPLETE: 'uncomplete',
  ERROR: 'error',
};

const WizzardContext = createContext();

export function useWizzardContext() {
  return useContext(WizzardContext);
}

const initialState = {
  activeStep: 0,
  steps: new Map(),
  completed: {}, // {[0, { label: 'Personal', Element: Personal, error: null, }],...}
};

const reducer = (state, action) => {
  const totalSteps = () => {
    return state.steps.size;
  };

  const completedSteps = () => {
    return Object.keys(state.completed).length;
  };

  const isLastStep = () => {
    return state.activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  if (action.type === ACTION_TYPES.ERROR) {
    // Create a shallow copy of the existing Map
    const newSteps = new Map(state.steps);

    // Get the existing value for the given key
    const stepToUpdate = newSteps.get(state.activeStep);

    // Create a new object by shallow-copying all properties and updating the 'error' field
    const updatedStep = { ...stepToUpdate };
    // Check if not a boolean
    if (typeof action.payload !== 'boolean') {
      throw new Error(
        `Error must be a boolean value. Received: ${typeof action.payload}`
      );
    }
    // Update error bool value
    updatedStep.error = action.payload;

    // Set the new object back into the Map
    newSteps.set(state.activeStep, updatedStep);

    // Update the state
    return {
      ...state,
      steps: newSteps,
    };
  }

  if (action.type === ACTION_TYPES.ACTIVE_STEP) {
    return {
      ...state,
      activeStep: action.payload,
    };
  }

  if (action.type === ACTION_TYPES.NEXT) {
    // It's the last step, but not all steps have been completed,
    // find the first step that has been completed
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? Array.from(state.steps.keys()).find(
            (key) => !(key in state.completed)
          )
        : state.activeStep + 1;

    return {
      ...state,
      activeStep: newActiveStep,
    };
  }
  if (action.type === ACTION_TYPES.BACK) {
    return {
      ...state,
      activeStep: state.activeStep - 1,
    };
  }
  if (action.type === ACTION_TYPES.RESET) {
    return {
      ...state,
      activeStep: 0,
      completed: {},
    };
  }
  if (action.type === ACTION_TYPES.COMPLETE) {
    return {
      ...state,
      completed: {
        ...state.completed,
        [state.activeStep]: true,
      },
    };
  }
  if (action.type === ACTION_TYPES.UNCOMPLETE) {
    return {
      ...state,
      completed: removeItem(state.completed, state.activeStep),
    };
  }
  return state;
};

export default function WizzardProvider({ children, steps: initialSteps }) {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    steps: initialSteps ?? new Map(),
  });

  const totalSteps = useMemo(() => {
    return state.steps.size;
  }, [state.steps.size]);

  const completedSteps = useMemo(() => {
    return Object.keys(state.completed).length;
  }, [Object.keys(state.completed).length]);

  const isLastStep = useMemo(() => {
    return state.activeStep === totalSteps - 1;
  }, [state.activeStep, totalSteps]);

  const allStepsCompleted = useMemo(() => {
    return completedSteps === totalSteps;
  }, [completedSteps, totalSteps]);

  const handleActiveStep = useCallback((index) => {
    dispatch({ type: ACTION_TYPES.ACTIVE_STEP, payload: index });
  }, []);

  const handleNext = useCallback(() => {
    dispatch({ type: ACTION_TYPES.NEXT });
  }, []);

  const handleBack = useCallback(() => {
    dispatch({ type: ACTION_TYPES.BACK });
  }, []);

  const handleComplete = useCallback(() => {
    dispatch({ type: ACTION_TYPES.COMPLETE });
  }, []);

  const handleUncomplete = useCallback(() => {
    dispatch({ type: ACTION_TYPES.UNCOMPLETE });
  }, []);

  const handleReset = useCallback(() => {
    dispatch({ type: ACTION_TYPES.RESET });
  }, []);

  const setError = useCallback(() => {
    dispatch({ type: ACTION_TYPES.ERROR, payload: true });
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: ACTION_TYPES.ERROR, payload: false });
  }, []);

  const value = {
    state,
    actions: {
      handleActiveStep,
      handleNext,
      handleBack,
      handleComplete,
      handleUncomplete,
      handleReset,
      setError,
      clearError,
    },
    meta: {
      totalSteps,
      completedSteps,
      isLastStep,
      allStepsCompleted,
    },
  };

  return (
    <WizzardContext.Provider value={value}>{children}</WizzardContext.Provider>
  );
}

WizzardProvider.propTypes = {
  children: PropTypes.node.isRequired,
  steps: PropTypes.instanceOf(Map),
};