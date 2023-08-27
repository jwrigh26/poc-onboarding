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
};

const POCWizzardContext = createContext();

export function usePOCWizzardContext() {
  return useContext(POCWizzardContext);
}

const POCWizzardActionsContext = createContext();

export function usePOCWizzardActionsContext() {
  return useContext(POCWizzardActionsContext);
}

const POCWizzardMetaContext = createContext();

export function usePOCWizzardMetaContext() {
  return useContext(POCWizzardMetaContext);
}

const initialState = {
  activeStep: 0,
  steps: [],
  completed: {}, // { 0: true, 1: true, 2: true, 3: true, 4: true }
};

const reducer = (state, action) => {
  const totalSteps = () => {
    return state.steps.length;
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

  if (action.type === ACTION_TYPES.ACTIVE_STEP) {
    return {
      ...state,
      activeStep: action.payload,
    };
  }

  if (action.type === ACTION_TYPES.NEXT) {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          state.steps.findIndex((step, i) => !(i in state.completed))
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

export default function POCWizzardProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const totalSteps = useMemo(() => {
    return state.steps.length;
  }, [state.steps.length]);

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

  const value = {
    state,
    actions: {
      handleActiveStep,
      handleNext,
      handleBack,
      handleComplete,
      handleUncomplete,
      handleReset,
    },
    meta: {
      totalSteps,
      completedSteps,
      isLastStep,
      allStepsCompleted,
    },
  };

  return (
    <POCWizzardContext.Provider value={value}>
      {children}
    </POCWizzardContext.Provider>
  );
}

POCWizzardProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
