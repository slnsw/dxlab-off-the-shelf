import * as React from 'react';

import BookCard from '../BookCard';
import BookSpines from '../BookSpines';

import {
  useDimensions,
  // usePrevious,
  // useDebounce
} from '../../lib/hooks';

import scrollToItem from '../../lib/scroll-to-item';

import css from './BookShelf.scss';

type Props = {
  books: any[];
  scrollToBook: number;
  index?: number;
  id?: string;
  className?: string;
  onClick?: Function;
};

const BookShelf: React.FunctionComponent<Props> = ({
  books = [],
  scrollToBook,
  index,
  id,
  className,
  onClick,
}) => {
  const [booksInView, setBooksInView] = React.useState([]);
  const [ref, dimensions, node] = useDimensions();
  const { height } = dimensions;

  const scrollId = React.useRef(null);
  const [isScrolling, setIsScrolling] = React.useState(false);
  const [scrollDirection, setScrollDirection] = React.useState(null);
  const scrollLeftRef = React.useRef(0);

  // if (scrollDirection) {
  //   console.log(scrollDirection, index);
  // }

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

  const handleScroll = (e) => {
    const element = e.target as HTMLElement;
    const prevScrollLeft = scrollLeftRef.current;
    scrollLeftRef.current = element.scrollLeft;

    if (isScrolling === false) {
      setIsScrolling(true);
    } else if (isScrolling && scrollDirection === null) {
      const delta = scrollLeftRef.current - prevScrollLeft;

      // if (index === 0) {
      // console.log(delta, scrollLeftRef.current, prevScrollLeft, index);
      // }

      setScrollDirection(delta > 0 ? 'right' : 'left');
    }

    if (scrollId && scrollId.current) {
      clearTimeout(scrollId.current);
    }

    scrollId.current = setTimeout(() => {
      setIsScrolling(false);
      setScrollDirection(null);
    }, 100);
  };

  return (
    <div
      id={id}
      className={[css.bookShelf, className || ''].join(' ')}
      ref={ref}
      onScroll={handleScroll}
    >
      {books
        .filter(
          (book) =>
            book.sizes && book.sizes.medium && book.sizes.medium.sourceUrl,
        )
        .map((book) => {
          const ratio = book.sizes.medium.width / book.sizes.medium.height;
          const imageHeight = height - 16;
          const imageWidth = ratio * height;

          return (
            <React.Fragment key={book.id}>
              <BookCard
                id={book.id}
                title={book.title}
                imageUrl={book.sizes.medium.sourceUrl}
                imageWidth={imageWidth}
                imageHeight={imageHeight}
                isScrolling={isScrolling}
                scrollDirection={scrollDirection}
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
