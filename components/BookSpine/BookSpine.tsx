import * as React from 'react';

import {
  motion,
  // useAnimation
} from 'framer-motion';
import { appConfig } from '../../configs';

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
}) => {
  const [originX, setOriginX] = React.useState();
  const h = id % 5; // Math.floor(Math.random() * 5);

  React.useEffect(() => {
    if (scrollDirection) {
      setOriginX(scrollDirection === 'right' ? 1 : 0);
    }
  }, [scrollDirection]);

  if (id < 1 || id > appConfig.numberOfSpines) {
    return null;
  }

  // Work out rotate angle based on % of height (opposite) and gutter width
  // (adjacent) using trigonetry
  const theta = (Math.atan2(height * 0.8, appConfig.gutter) * 180) / Math.PI;
  const angle = 90 - theta;

  let rotate = 0;

  if (originX === 1) {
    rotate = angle;
  } else if (originX === 0) {
    rotate = -1 * angle;
  }

  const nonEdgeHeight = [
    h === 0 ? css.height0 : '',
    h === 1 ? css.height1 : '',
    h === 2 ? css.height2 : '',
    h === 3 ? css.height3 : '',
    h === 4 ? css.height4 : '',
  ].join(' ');

  return (
    <motion.article
      id={`spine-${id}`}
      className={[css.bookSpine, className || ''].join(' ')}
      animate={{
        y: isActive ? 0 : '100%',
        rotate,
      }}
      transition={{
        delay: index * 0.05,
        type: 'spring',
        damping: 7,
        stiffness: 50,
      }}
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
    </motion.article>
  );
};

export default BookSpine;
