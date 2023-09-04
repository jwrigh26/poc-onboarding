import { useMemo } from 'react';
import { isFunction } from 'helpers/utils';
// https://www.joshwcomeau.com/snippets/javascript/debounce/
// Our debounce function takes two arguments: a callback function and a duration in milliseconds.
// Cancel any pre-existing timeouts
// Schedule a new timeout
// When the timeout expires, we call our callback function with apply, and feed it whatever arguments we have.
//
// -- Example --
//
// const handleTotalSquares = useDebounce((value) => {
//   setErrorForInstallDateGroups([]);
//   if (value <= 500) {
//     return setRowsByTotalSquares(value);
//   }
//   return null;
// }, theme.transitions.duration.complex);
const debounce = (callback, wait) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      // eslint-disable-next-line prefer-spread
      callback.apply(null, args);
    }, wait);
  };
};

export function useDebounce(callback, delay = 250) {
  const handleDebounce = useMemo(
    () =>
      debounce((event) => {
        event.persist(); // make sure the event hangs around for the entire debounce time
        if (isFunction(callback)) {
          // We're expecting an event to be passed in, so we give it to the callback
          callback(event);
        }
      }, delay),
    []
  );

  return handleDebounce;
}
