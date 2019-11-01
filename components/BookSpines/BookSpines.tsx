import * as React from 'react';

import BookSpine from '../BookSpine';

import css from './BookSpines.scss';

type Props = {
  className?: string;
  spines: number[];
  height: number;
  isScrolling?: boolean;
  isActive?: boolean;
  scrollDirection?: 'left' | 'right';
  scrollDelta?: number;
  animationDelay?: number;
};

const BookSpines: React.FunctionComponent<Props> = ({
  className,
  spines = [],
  height,
  isScrolling = false,
  isActive = false,
  scrollDirection = null,
  scrollDelta = 0,
  animationDelay = 0,
}) => {
  const [localScrollDirection, setLocalScrollDirection] = React.useState(null);

  React.useEffect(() => {
    setLocalScrollDirection(scrollDirection);
  }, [scrollDirection]);

  if (spines.length === 0) {
    return null;
  }

  return (
    <div
      className={[css.bookSpines, className || ''].join(' ')}
      onClick={() => {
        setLocalScrollDirection(
          localScrollDirection === 'left' ? 'right' : 'left',
        );
      }}
    >
      {spines.map((spine, i) => {
        const rIndex = isScrolling ? spines.length - 1 - i : i;
        const lIndex = isScrolling ? i : spines.length - 1 - i;
        const index = scrollDirection === 'right' ? rIndex : lIndex;

        return (
          <BookSpine
            key={`${spine}-${i}`}
            id={spine}
            index={index}
            height={height}
            isEdge={i === 0 || i === spines.length - 1}
            isScrolling={isScrolling}
            isActive={isActive}
            scrollDirection={localScrollDirection}
            scrollDelta={scrollDelta}
            animationDelay={animationDelay}
          />
        );
      })}
    </div>
  );
};

export default BookSpines;
