import * as React from 'react';

import css from './BookSpine.scss';

type Props = {
  className?: string;
  id: number;
};

const BookSpine: React.FunctionComponent<Props> = ({ className, id }) => {
  if (id < 1 || id > 96) {
    return null;
  }
  return (
    <div className={[css.bookSpine, className || ''].join(' ')}>
      <img
        src={`/images/spines/${id}.png`}
        className={css.image}
        // lazy="true"
        alt="spine"
      />
    </div>
  );
};

export default BookSpine;
