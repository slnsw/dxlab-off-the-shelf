import * as React from 'react';
// import { useMotionValue, useSpring } from 'framer-motion';

import BookCard from '../BookCard';
import BookSpines from '../BookSpines';

import useDimensions from '../../lib/hooks/use-dimensions';
import scrollToItem from '../../lib/scroll-to-item';

import css from './BookShelf.scss';

type Props = {
  books: any[];
  scrollToBook: number;
  id?: string;
  className?: string;
  onClick?: Function;
};

const BookShelf: React.FunctionComponent<Props> = ({
  books = [],
  scrollToBook,
  id,
  className,
  onClick,
}) => {
  const [booksInView, setBooksInView] = React.useState([]);
  const [ref, dimensions, node] = useDimensions();
  const { height } = dimensions;

  React.useEffect(() => {
    const book = books[scrollToBook];

    if (book) {
      const bookId = books[scrollToBook].id;
      const bookNode = document.getElementById(`bookCard-${bookId}`);

      if (bookNode) {
        scrollToItem(node, bookNode, null, 8000);
      }
    }
  }, [scrollToBook, node, books]);

  const handleBookCardRender = (inView, entry, bookId) => {
    // Check if already added to local state array `booksInView`
    const inBooksInView = booksInView.includes(bookId);

    if (inView && inBooksInView === false) {
      // Append if not already in
      setBooksInView([...booksInView, bookId]);
    } else if (inView === false && inBooksInView) {
      // Remove if still not in view and still in local state
      setBooksInView(
        booksInView.filter((inViewBookId) => inViewBookId !== bookId),
      );
    }
  };

  return (
    <div
      id={id}
      className={[css.bookShelf, className || ''].join(' ')}
      ref={ref}
    >
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
                onRender={handleBookCardRender}
              ></BookCard>

              <BookSpines spines={book.spines} />
            </React.Fragment>
          );
        })}
    </div>
  );
};

export default BookShelf;
