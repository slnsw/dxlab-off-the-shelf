import * as React from 'react';

import css from './BookCard.scss';

type Props = {
  id: number;
  title: string;
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
  className?: string;
  onClick?: Function;
};

const BookCard: React.FunctionComponent<Props> = ({
  id,
  title,
  imageUrl,
  imageWidth,
  imageHeight,
  className,
  onClick,
}) => {
  return (
    <article
      className={[css.bookCard, className || ''].join(' ')}
      onClick={(e) => {
        if (typeof onClick === 'function') {
          onClick(e, id);
        }
      }}
    >
      {/* {title} */}
      <img
        src={imageUrl}
        alt={title}
        className={css.image}
        style={{
          width: imageWidth,
          height: imageHeight,
        }}
      ></img>
    </article>
  );
};

export default BookCard;
