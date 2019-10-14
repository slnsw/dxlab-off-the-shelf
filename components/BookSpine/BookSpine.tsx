import * as React from 'react';

import css from './BookSpine.scss';

type Props = {
  className?: string;
};

const BookSpine: React.FunctionComponent<Props> = ({ className }) => {
  const spineId = Math.floor(Math.random() * 96) + 1;
  return (
    <div className={[css.bookSpine, className || ''].join(' ')}>
      <img src={`/images/spines/${spineId}.png`} className={css.image} lazy />
    </div>
  );
};

export default BookSpine;
