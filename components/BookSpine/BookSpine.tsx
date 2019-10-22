import * as React from 'react';

import {
  motion,
  // useAnimation
} from 'framer-motion';

import css from './BookSpine.scss';

type Props = {
  className?: string;
  id: number;
  index: number;
  isScrolling?: boolean;
  isHidden?: boolean;
  scrollDirection?: 'left' | 'right';
  scrollDelta?: number;
};

const BookSpine: React.FunctionComponent<Props> = ({
  className,
  id,
  index,
  isScrolling = false,
  isHidden = false,
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

  if (id < 1 || id > 96) {
    return null;
  }

  let rotate = 0;

  if (originX === 1) {
    rotate = 5.3;
  } else if (originX === 0) {
    rotate = -5.3;
  }

  return (
    <motion.article
      id={`spine-${id}`}
      className={[css.bookSpine, className || ''].join(' ')}
      animate={{
        y: isHidden ? '100%' : 0,
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
        // src={`/images/spines/${id}.png`}
        src={`https://dxlab-off-the-shelf.s3-ap-southeast-2.amazonaws.com/spines/${id}.png`}
        className={[
          css.image,
          // css[`height${h}`],
          h === 0 ? css.height0 : '',
          h === 1 ? css.height1 : '',
          h === 2 ? css.height2 : '',
          h === 3 ? css.height3 : '',
          h === 4 ? css.height4 : '',
        ].join(' ')}
        // lazy="true"
        alt="spine"
      />
    </motion.article>
  );
};

export default BookSpine;
