import * as React from 'react';

import BookSpine from '../BookSpine';

import css from './BookSpines.scss';

type Props = {
  className?: string;
  spines: number[];
};

const BookSpines: React.FunctionComponent<Props> = ({
  className,
  spines = [],
}) => {
  if (spines.length === 0) {
    return null;
  }

  return (
    <div className={[css.bookSpines, className || ''].join(' ')}>
      {spines.map((spine, i) => {
        return <BookSpine key={`${spine}-${i}`} id={spine} />;
      })}
    </div>
  );
};

export default BookSpines;
