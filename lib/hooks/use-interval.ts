import * as React from 'react';

function useInterval(callback, delay, isActive = true) {
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
        id = setInterval(tick, delay);
        // console.log('Start interval', id, 'called by ', calledBy);
      }

      return () => {
        // console.log('Clear interval', id, 'called by', calledBy);
        clearInterval(id);
      };
    }

    return null;
  }, [delay, isActive]);
}

export default useInterval;
