import * as React from 'react';

import BookCard from '../BookCard';
import BookSpines from '../BookSpines';

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
  const [ref, dimensions] = useDimensions();
  const { height } = dimensions;

  // React.useEffect(() => {
  //   if (typeof onChange === 'function') {
  //     onChange(dimensions);
  //   }
  // }, [dimensions]);

  return (
    <div className={[css.bookCards, className || ''].join(' ')} ref={ref}>
      {books
        .filter(
          (book) =>
            book.sizes && book.sizes.medium && book.sizes.medium.sourceUrl,
        )
        .map((book) => {
          const ratio = book.sizes.medium.width / book.sizes.medium.height;
          const imageWidth = ratio * height;

          return (
            <>
              <BookCard
                key={book.id * 2 + 1}
                id={book.id}
                title={book.title}
                imageUrl={book.sizes.medium.sourceUrl}
                imageWidth={imageWidth}
                imageHeight={height}
                onClick={onClick}
              ></BookCard>

              <BookSpines key={book.id * 2} spines={book.spines} />
            </>
          );
        })}
    </div>
  );
};

export default BookCards;
