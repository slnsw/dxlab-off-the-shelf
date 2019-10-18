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
  imageWidth = 0,
  imageHeight = 0,
  className,
  onClick,
}) => {
  if (!imageWidth) {
    return null;
  }
  return (
    <article
      id={`bookCard-${id}`}
      className={[css.bookCard, className || ''].join(' ')}
      onClick={(e) => {
        if (typeof onClick === 'function') {
          onClick(e, { id, title, imageUrl });
        }
      }}
    >
      <img
        src={imageUrl}
        alt={title}
        className={css.image}
        // lazy="true"
        style={{
          width: imageWidth,
          height: imageHeight,
        }}
      ></img>
    </article>
  );
};

export default BookCard;
