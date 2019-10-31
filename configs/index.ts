// Durations
export const IS_INTERVAL_ENABLED = true;
export const IDLE_TIMEOUT =
  (process.env.IDLE_TIMEOUT && parseInt(process.env.IDLE_TIMEOUT, 10)) || 60000;
export const LOGO_TIMEOUT = 25000;
export const TIME_BETWEEN_SCROLLS = 11000;
export const SCROLL_TIME = 8000;
export const SHUFFLE_TIMEOUT = 6000;

// Design
export const GUTTER = 24;

// Amounts
export const NUMBER_OF_BOOKS_TO_DISPLAY = 200;
export const NUMBER_OF_SPINES = 96; // 96;
export const MAX_NUMBER_OF_SPINES = 4; // per gap
export const HAS_SPINES_PROBABILITY = 0.5; // 1 = always, 0 = never

export const SCROLL_RANGE_MIN = 3;
export const SCROLL_RANGE_MAX = 9;
