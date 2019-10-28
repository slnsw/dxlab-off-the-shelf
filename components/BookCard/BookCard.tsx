import * as React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

import * as appConfig from '../../configs';

import css from './BookCard.scss';

type Props = {
  id: number;
  title: string;
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
  isScrolling?: boolean;
  isActive?: boolean;
  scrollDirection?: 'left' | 'right';
  scrollDelta?: number;
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
  isActive = false,
  scrollDirection = null,
  scrollDelta = 0,
  className,
  onClick,
  onRender,
}) => {
  const [ref, inView, entry] = useInView();
  const [originX, setOriginX] = React.useState();

  React.useEffect(() => {
    if (scrollDirection) {
      setOriginX(scrollDirection === 'right' ? 1 : 0);
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
    rotate = 0;
  } else if (isScrolling) {
    const rotateValue = Math.abs(scrollDelta) > 20 ? 1.5 : 0.5;
    rotate = scrollDirection === 'right' ? rotateValue : rotateValue * -1;
  } else {
    rotate = 0;
  }

  return (
    <motion.article
      id={`bookCard-${id}`}
      className={[css.bookCard, className || ''].join(' ')}
      animate={{
        rotate,
        // y: isActive ? 10 : 0,
        // y: isScrolling ? -0.5 : 0,
      }}
      transition={{
        delay: Math.random() * 0.2,
        duration: 0.4,
        type: 'spring',
        damping: isScrolling ? 10 : 4,
        stiffness: 300,
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
      <motion.img
        src={imageUrl}
        alt={title}
        className={css.image}
        animate={{
          y: isActive ? 0 : imageHeight + appConfig.GUTTER,
        }}
        transition={{
          delay: Math.random() * 0.4,
          type: 'spring',
          damping: 12,
          stiffness: 100,
          mass: 2,
        }}
        style={{
          width: imageWidth,
          height: imageHeight,
        }}
      />
    </motion.article>
  );
};

export default BookCard;
