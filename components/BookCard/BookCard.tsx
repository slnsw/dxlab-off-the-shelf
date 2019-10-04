import * as React from 'react';

import css from './BookCard.scss';

type Props = {
  id: number;
  title: string;
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
  className?: string;
};

const BookCard: React.FunctionComponent<Props> = ({
  id,
  title,
  imageUrl,
  imageWidth,
  imageHeight,
  className,
}) => {
  return (
    <article
      className={[css.bookCard, className || ''].join(' ')}
      // style={{
      //   width: imageWidth,
      //   height: imageHeight,
      // }}
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
