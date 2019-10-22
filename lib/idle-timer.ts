/**
 * Create a timer that runs a callback when there is no interaction after a
 * certain duration
 * @param callback Callback function to be called when timer becomes idle.
 * @param duration Duration in milliseconds.
 */
export const createIdleTimer = (
  callback,
  duration = 15000,
  { hasLogs } = { hasLogs: false },
) => {
  let timeout;

  const onUserIdle = () => {
    if (hasLogs) {
      console.log(`idleTimer.onUserIdle()`, timeout);
    }

    if (typeof callback === 'function') {
      callback();
    }
  };

  const reset = () => {
    clearTimeout(timeout);
    timeout = setTimeout(onUserIdle, duration);

    if (hasLogs) {
      console.log(`idleTimer.reset()`, timeout);
    }
  };

  return {
    start: () => {
      if (!timeout) {
        if (hasLogs) {
          console.log('idleTimer.start()', duration);
        }

        timeout = setTimeout(onUserIdle, duration);

        window.addEventListener('mousemove', reset);
        window.addEventListener('touchmove', reset);
        window.addEventListener('keydown', reset);
        window.addEventListener('click', reset);
      }
    },
    stop: () => {
      if (timeout) {
        if (hasLogs) {
          console.log('idleTimer.stop()', timeout);
        }

        window.removeEventListener('mousemove', reset);
        window.removeEventListener('touchmove', reset);
        window.removeEventListener('keydown', reset);
        window.removeEventListener('click', reset);

        clearTimeout(timeout);
        timeout = false;
      }
    },
  };
};
