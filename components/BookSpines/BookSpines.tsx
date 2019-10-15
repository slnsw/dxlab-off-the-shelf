import * as React from 'react';

import BookSpine from '../BookSpine';

import css from './BookSpines.scss';

type Props = {
  className?: string;
  count: number;
};

const BookSpines: React.FunctionComponent<Props> = ({ className, count }) => {
  return (
    <div className={[css.bookSpines, className || ''].join(' ')}>
      {[...Array(count)].map((i) => {
        return <BookSpine key={i} />;
      })}
    </div>
  );
};

export default BookSpines;
