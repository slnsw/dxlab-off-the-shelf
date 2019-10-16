import * as React from 'react';

import BookCard from '../BookCard';
import BookSpines from '../BookSpines';

import useDimensions from '../../lib/hooks/use-dimensions';

import css from './BookShelf.scss';

type Props = {
  books: any[];
  className?: string;
  onClick?: Function;
};

const BookShelf: React.FunctionComponent<Props> = ({
  books = [],
  className,
  onClick,
}) => {
  const [ref, dimensions] = useDimensions();
  const { height } = dimensions;

  return (
    <div className={[css.bookShelf, className || ''].join(' ')} ref={ref}>
      {books
        .filter(
          (book) =>
            book.sizes && book.sizes.medium && book.sizes.medium.sourceUrl,
        )
        .map((book) => {
          const ratio = book.sizes.medium.width / book.sizes.medium.height;
          const imageWidth = ratio * height;

          return (
            <React.Fragment key={book.id}>
              <BookCard
                id={book.id}
                title={book.title}
                imageUrl={book.sizes.medium.sourceUrl}
                imageWidth={imageWidth}
                imageHeight={height}
                onClick={onClick}
              ></BookCard>

              <BookSpines spines={book.spines} />
            </React.Fragment>
          );
        })}
    </div>
  );
};

export default BookShelf;
