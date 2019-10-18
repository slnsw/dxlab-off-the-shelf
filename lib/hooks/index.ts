import * as React from 'react';

/**
 * Listen for a particular key press
 */
// TODO: Fix this issue, very naughty Kaho!
/* eslint-disable react-hooks/exhaustive-deps */
export function useKeyPress(targetKey, callback) {
  // If released key is our target key then set to false
  const upHandler = ({ key }) => {
    if (key === targetKey && typeof callback === 'function') {
      callback();
    }
  };

  // Add event listeners
  React.useEffect(() => {
    window.addEventListener('keyup', upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keyup', upHandler);
    };
  }, [upHandler]); // Empty array ensures that effect is only run on mount and unmount
}
/* eslint-enable react-hooks/exhaustive-deps */

/**
 * Get window size
 */
// TODO: Fix this issue, very naughty Kaho!
/* eslint-disable react-hooks/exhaustive-deps */
export function useWindowSize(width: number = 800, height: number = 600) {
  const isClient = typeof window === 'object';

  function getSize() {
    return {
      width: isClient ? window.innerWidth : width,
      height: isClient ? window.innerHeight : height,
    };
  }

  const [windowSize, setWindowSize] = React.useState(getSize);

  React.useEffect(() => {
    if (!isClient) {
      return null;
    }

    /**
     * Handle resize events.
     *
     * Since Safari will sometimes fire resize events during a scroll,
     * check to make sure that the window size has actually changed.
     */
    function handleResize() {
      const currentSize = getSize();
      if (
        currentSize.width !== windowSize.width ||
        currentSize.height !== windowSize.height
      ) {
        setWindowSize(currentSize);
      }
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getSize, isClient, windowSize.height, windowSize.width]); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}
/* eslint-enable react-hooks/exhaustive-deps */

/**
 * Use Previous Hook
 */
export function usePrevious(value) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = React.useRef();

  // Store current value in ref
  React.useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current;
}
