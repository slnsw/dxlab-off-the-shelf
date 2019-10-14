import * as React from 'react';

import BookSpine from '../BookSpine';

import css from './BookSpines.scss';

type Props = {
  className?: string;
};

const BookSpines: React.FunctionComponent<Props> = ({ className }) => {
  const spines = Math.floor(Math.random() * 4) + 1;
  console.log(spines);
  return (
    <div className={[css.bookSpines, className || ''].join(' ')}>
      {[...Array(spines)].map((i) => {
        return <BookSpine key={i} />;
      })}
    </div>
  );
};

export default BookSpines;
