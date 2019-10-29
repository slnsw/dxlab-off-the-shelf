import * as React from 'react';

function useTimeout(callback, delay, isActive = true) {
  const savedCallback = React.useRef();

  // Remember the latest callback.
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  React.useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    let id;

    if (delay !== null) {
      if (isActive) {
        // console.log('Start interval');

        id = setTimeout(tick, delay);
      }

      return () => {
        // console.log('clear', id);

        clearTimeout(id);
      };
    }

    return null;
  }, [delay, isActive]);
}

export default useTimeout;
