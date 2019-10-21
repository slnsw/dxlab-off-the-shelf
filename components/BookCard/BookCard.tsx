import * as React from 'react';
import { useInView } from 'react-intersection-observer';
import {
  motion,
  // useAnimation
} from 'framer-motion';

import css from './BookCard.scss';

type Props = {
  id: number;
  title: string;
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
  isScrolling?: boolean;
  scrollDirection?: 'left' | 'right';
  className?: string;
  onClick?: Function;
  onRender?: Function;
};

const BookCard: React.FunctionComponent<Props> = ({
  id,
  title,
  imageUrl,
  imageWidth = 0,
  imageHeight = 0,
  isScrolling = false,
  scrollDirection = null,
  className,
  onClick,
  onRender,
}) => {
  const [ref, inView, entry] = useInView();
  const [originX, setOriginX] = React.useState();

  React.useEffect(() => {
    if (scrollDirection) {
      setOriginX(scrollDirection === 'left' ? 1 : 0);
    }
  }, [scrollDirection]);

  if (!imageWidth) {
    return null;
  }

  if (typeof onRender === 'function') {
    onRender(inView, entry, id);
  }

  let rotate;

  if (inView && isScrolling === false) {
    // rotate = [0, -2, 0, -1, 0, -0.5, 0, -0.25, 0, -0.125];
    rotate = 0;
  } else if (isScrolling) {
    rotate = scrollDirection === 'right' ? -2 : 2;
  } else {
    rotate = 0;
  }

  return (
    <motion.article
      id={`bookCard-${id}`}
      className={[css.bookCard, className || ''].join(' ')}
      animate={{
        // opacity: inView ? 1 : 0,
        // rotate: -5,
        rotate,
      }}
      transition={{
        delay: Math.random() * 0.3,
        duration: 0.5,
      }}
      style={{
        originX,
        originY: 1,
      }}
      onClick={(e) => {
        if (typeof onClick === 'function') {
          onClick(e, { id, title, imageUrl });
        }
      }}
      ref={ref}
    >
      <img
        src={imageUrl}
        alt={title}
        className={css.image}
        // lazy="true"
        style={{
          width: imageWidth,
          height: imageHeight,
        }}
      />
    </motion.article>
  );
};

export default BookCard;
