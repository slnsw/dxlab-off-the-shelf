import * as React from 'react';

import BookCard from '../BookCard';

import useDimensions from '../../lib/hooks/use-dimensions';

import css from './BookCards.scss';

type Props = {
  books: any[];
  className?: string;
  onClick?: Function;
};

const BookCards: React.FunctionComponent<Props> = ({
  books = [],
  className,
  onClick,
}) => {
  const [ref, { height }] = useDimensions();

  // console.log(height);

  return (
    <div className={[css.bookCards, className || ''].join(' ')} ref={ref}>
      {books
        .filter((book) => book.sizes.large.sourceUrl)
        .map((book) => {
          const ratio = book.sizes.large.width / book.sizes.large.height;
          const imageWidth = ratio * height;

          return (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              imageUrl={book.sizes.large.sourceUrl}
              imageWidth={imageWidth}
              imageHeight={height}
              onClick={onClick}
            ></BookCard>
          );
        })}
    </div>
  );
};

export default BookCards;
