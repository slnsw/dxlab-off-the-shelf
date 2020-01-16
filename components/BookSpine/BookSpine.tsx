import * as React from 'react';
import {
  motion,
  // useAnimation
} from 'framer-motion';

import { useMediaQuery } from '../../lib/hooks';

import * as configs from '../../configs';

import css from './BookSpine.scss';

type Props = {
  className?: string;
  id: number;
  index: number;
  height: number;
  isEdge: boolean;
  isScrolling?: boolean;
  isActive?: boolean;
  scrollDirection?: 'left' | 'right';
  scrollDelta?: number;
  animationDelay?: number;
};

const BookSpine: React.FunctionComponent<Props> = ({
  className,
  id,
  index,
  height,
  isEdge,
  isScrolling = false,
  isActive = false,
  scrollDirection = null,
  scrollDelta = 0,
  animationDelay = 0,
}) => {
  const [originX, setOriginX] = React.useState();
  const h = id % 5; // Math.floor(Math.random() * 5);

  const mediaQuery = useMediaQuery();
  const gutter = ['xs', 'sm'].includes(mediaQuery)
    ? configs.MOBILE_GUTTER
    : configs.DESKTOP_GUTTER;

  React.useEffect(() => {
    if (scrollDirection) {
      setOriginX(scrollDirection === 'right' ? 1 : 0);
    }
  }, [scrollDirection]);

  if (id < 1 || id > configs.NUMBER_OF_SPINES) {
    return null;
  }

  // Work out rotate angle based on % of height (opposite) and gutter width
  // (adjacent) using trigonetry
  const theta = (Math.atan2(height * 0.8, gutter) * 180) / Math.PI;
  const angle = 90 - theta;

  let rotate = 0;

  if (originX === 1) {
    rotate = angle + (isScrolling ? 0.7 : 0);
  } else if (originX === 0) {
    rotate = -1 * (angle + (isScrolling ? 0.7 : 0));
  }

  const nonEdgeHeight = [
    h === 0 ? css.height0 : '',
    h === 1 ? css.height1 : '',
    h === 2 ? css.height2 : '',
    h === 3 ? css.height3 : '',
    h === 4 ? css.height4 : '',
  ].join(' ');

  const activeDelay = isActive ? animationDelay : 0;

  return (
    <motion.div
      id={`spine-${id}`}
      className={[css.bookSpine, className || ''].join(' ')}
      animate={{
        y: isActive ? 0 : '100%',
        rotate,
      }}
      transition={{
        delay: index * 0.05 + activeDelay,
        type: 'spring',
        damping: 20,
        stiffness: 50,
        mass: 2,
      }}
      initial={false}
      style={{
        originX,
        originY: 1,
      }}
    >
      <img
        src={`https://dxlab-off-the-shelf.s3-ap-southeast-2.amazonaws.com/spines/${id}.png`}
        className={[css.image, isEdge ? css.edgeHeight : nonEdgeHeight].join(
          ' ',
        )}
        alt="Book spine"
      />
    </motion.div>
  );
};

export default BookSpine;
