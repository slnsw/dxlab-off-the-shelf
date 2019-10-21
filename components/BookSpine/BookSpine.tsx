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
  const h = id % 5; // Math.floor(Math.random() * 5);

  return (
    <div className={[css.bookSpine, className || ''].join(' ')}>
      <img
        src={`/images/spines/${id}.png`}
        className={[
          css.image,
          // css[`height${h}`],
          h === 0 ? css.height0 : '',
          h === 1 ? css.height1 : '',
          h === 2 ? css.height2 : '',
          h === 3 ? css.height3 : '',
          h === 4 ? css.height4 : '',
        ].join(' ')}
        // lazy="true"
        alt="spine"
      />
    </div>
  );
};

export default BookSpine;
