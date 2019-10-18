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
      // if (isActive) {
      console.log('start');

      id = setInterval(tick, delay);
      // }
      return () => clearInterval(id);

      // if (id && isActive === false) {
      //   console.log('stop');

      //   return () => clearInterval(id);
      // }
    }

    return null;
  }, [delay]);
}

export default useInterval;
