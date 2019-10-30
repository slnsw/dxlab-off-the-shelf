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
  animationDelay?: number;
  scrollDirection?: 'left' | 'right';
  scrollDelta?: number;
  containerElement?: HTMLElement;
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
  animationDelay = 0,
  scrollDirection = null,
  scrollDelta = 0,
  // containerElement,
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
  } else if (inView && isScrolling) {
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
      ref={ref}
    >
      {/* {inView ? ( */}
      <motion.img
        src={imageUrl}
        alt={title}
        className={css.image}
        animate={{
          y: isActive ? 0 : imageHeight + appConfig.GUTTER,
        }}
        transition={{
          delay: Math.random() * 0.4 + animationDelay,
          type: 'spring',
          damping: 20,
          stiffness: 50,
          mass: 2,
        }}
        initial={false}
        style={{
          width: imageWidth,
          height: imageHeight,
        }}
        onClick={(e) => {
          if (typeof onClick === 'function') {
            onClick(e, { id, title, imageUrl });
          }
        }}
      />
      {/* ) : (
        <div
          style={{
            width: imageWidth,
            height: imageHeight,
          }}
        ></div>
      )} */}
    </motion.article>
  );
};

export default BookCard;
