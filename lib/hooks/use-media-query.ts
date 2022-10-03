import { useWindowSize } from '.';

import variables from '../../styles/variables.module.scss';

/**
 * Get media query value
 */
export default function useMediaQuery() {
  const { width } = useWindowSize();

  const baseline = parseInt(variables.baseline, 10) || 8;
  const xs = parseInt(variables['media-xs'], 10) * baseline * 2;
  const sm = parseInt(variables['media-sm'], 10) * baseline * 2;
  const md = parseInt(variables['media-md'], 10) * baseline * 2;
  const lg = parseInt(variables['media-lg'], 10) * baseline * 2;
  const xlg = parseInt(variables['media-xlg'], 10) * baseline * 2;

  let mediaQuery = 'xxs';

  if (width >= xs && width < sm) {
    mediaQuery = 'xs';
  } else if (width >= sm && width < md) {
    mediaQuery = 'sm';
  } else if (width >= md && width < lg) {
    mediaQuery = 'md';
  } else if (width >= lg && width < xlg) {
    mediaQuery = 'lg';
  } else if (width >= xlg) {
    mediaQuery = 'xlg';
  }

  return mediaQuery;
}
