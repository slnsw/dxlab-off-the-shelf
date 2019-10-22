import * as React from 'react';

import BookSpine from '../BookSpine';

import css from './BookSpines.scss';

type Props = {
  className?: string;
  spines: number[];
  isScrolling?: boolean;
  scrollDirection?: 'left' | 'right';
  scrollDelta?: number;
};

const BookSpines: React.FunctionComponent<Props> = ({
  className,
  spines = [],
  isScrolling = false,
  scrollDirection = null,
  scrollDelta = 0,
}) => {
  if (spines.length === 0) {
    return null;
  }

  return (
    <div className={[css.bookSpines, className || ''].join(' ')}>
      {spines.map((spine, i) => {
        const rIndex = isScrolling ? spines.length - 1 - i : i;
        const lIndex = isScrolling ? i : spines.length - 1 - i;
        const index = scrollDirection === 'right' ? rIndex : lIndex;

        return (
          <BookSpine
            key={`${spine}-${i}`}
            id={spine}
            index={index}
            isScrolling={isScrolling}
            scrollDirection={scrollDirection}
            scrollDelta={scrollDelta}
          />
        );
      })}
    </div>
  );
};

export default BookSpines;
