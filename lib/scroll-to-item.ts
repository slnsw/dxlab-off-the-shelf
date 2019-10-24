// @file
// Animation utilities.

/**
 * Easing function easeInOutQuad.
 * @param t Current time.
 * @param b Start value.
 * @param c The change in value over the entire period.
 * @param d The total time of transition.
 */
const easeInOutQuad = (t, b, c, d) => {
  let tt = t;
  tt /= d / 2;
  if (tt < 1) return (c / 2) * tt * tt + b;
  tt -= 1;
  return (-c / 2) * (tt * (tt - 2) - 1) + b;
};

/**
 * Factory function to create an instance that controls scrolling
 * to a child within a container element.
 * @param container Container element.
 * @param item Child element.
 * @param callback Callback function to be called on completion.
 * @param duration Duration in milliseconds.
 * @param increment Milliseconds per tick.
 */
export const createScrollToItem = (
  container: HTMLElement,
  item: HTMLElement,
  callback: Function = null,
  duration: number = 5000,
  increment: number = 10,
) => {
  const start = (container as HTMLElement).scrollLeft;
  const to = item.offsetLeft - (container as HTMLElement).offsetLeft;
  const change = to - start;

  let currentTime = 0;
  let interval;

  return {
    start: () => {
      interval = setInterval(() => {
        currentTime += increment;
        container.scrollTo(
          easeInOutQuad(currentTime, start, change, duration),
          0,
        );

        if (currentTime >= duration) {
          clearInterval(interval);

          if (typeof callback === 'function') {
            callback();
          }
        }
      }, increment);
    },
    stop: () => {
      clearInterval(interval);

      if (typeof callback === 'function') {
        callback();
      }
    },
    // status: () => {
    //   return interval;
    // },
  };
};
