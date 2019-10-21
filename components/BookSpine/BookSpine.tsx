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
  scrollDirection?: 'left' | 'right';
};

const BookSpine: React.FunctionComponent<Props> = ({
  className,
  id,
  index,
  isScrolling = false,
  scrollDirection = null,
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

  if (isScrolling) {
    rotate = scrollDirection === 'right' ? 2 : -2;
  }

  return (
    <motion.article
      id={`spine-${id}`}
      className={[css.bookSpine, className || ''].join(' ')}
      animate={{
        // opacity: inView ? 1 : 0,
        // rotate: -5,
        rotate,
      }}
      transition={{
        delay: index * 0.1, // Math.random() * 0.3,
        duration: 0.5,
        ease: 'easeInOut',
      }}
      style={{
        originX,
        originY: 1,
      }}
    >
      <img
        src={`/images/spines/${id}.png`}
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
