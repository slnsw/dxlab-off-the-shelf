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
  className,
  onClick,
  onRender,
}) => {
  const [ref, inView, entry] = useInView();

  if (!imageWidth) {
    return null;
  }

  let isMoving;

  if (typeof onRender === 'function') {
    onRender(inView, entry, id);
  }

  return (
    <motion.article
      id={`bookCard-${id}`}
      className={[css.bookCard, className || ''].join(' ')}
      animate={{
        // opacity: inView ? 1 : 0,
        // rotate: -5,
        rotate:
          inView && !isMoving ? [0, -5, 0, -2, 0, -1, 0, -0.5, 0, -0.25] : 0,
      }}
      style={{
        originX: 0,
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
