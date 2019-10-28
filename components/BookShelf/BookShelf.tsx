import * as React from 'react';
import { motion } from 'framer-motion';

import BookCard from '../BookCard';
import BookSpines from '../BookSpines';

import * as configs from '../../configs';
import { useDimensions } from '../../lib/hooks';
import { createScrollToItem } from '../../lib/scroll-to-item';

import css from './BookShelf.scss';

type Props = {
  books: any[];
  scrollToBook: number;
  index?: number;
  id?: string;
  className?: string;
  isActive?: boolean;
  onClick?: Function;
  onRender?: Function;
};

const BookShelf: React.FunctionComponent<Props> = ({
  books = [],
  scrollToBook,
  index,
  id,
  className,
  isActive = false,
  onClick,
  onRender,
}) => {
  const [booksInView, setBooksInView] = React.useState([]);
  const [ref, dimensions, node] = useDimensions();
  const { height } = dimensions;

  const scrollId = React.useRef(null);
  const [isScrolling, setIsScrolling] = React.useState(false);
  const [scrollDirection, setScrollDirection] = React.useState(null);

  const scrollLeftRef = React.useRef(0);
  const scrollDeltaRef = React.useRef(0);
  const scrollToItem = React.useRef(null);

  React.useEffect(() => {
    const book = books[scrollToBook];

    if (book && isActive) {
      const bookId = books[scrollToBook].id;
      const bookNode = document.getElementById(`bookCard-${bookId}`);

      if (bookNode) {
        scrollToItem.current = createScrollToItem(
          node,
          bookNode,
          null,
          configs.SCROLL_TIME,
        );
        scrollToItem.current.start();
      }
    }
  }, [scrollToBook, node, books, isActive]);

  React.useEffect(() => {
    if (scrollToItem.current) {
      scrollToItem.current.stop();
    }
  }, [isActive]);

  React.useEffect(() => {
    if (typeof onRender === 'function') {
      onRender(booksInView);
    }
  }, [booksInView, onRender]);

  const handleBookCardRender = (inView, entry, bookId) => {
    // Check if already added to local state array `booksInView`
    const inBooksInView = booksInView.includes(bookId);
    // console.log(booksInView);
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
    const delta = scrollLeftRef.current - prevScrollLeft;
    scrollDeltaRef.current = delta;

    if (isScrolling === false) {
      setIsScrolling(true);
    } else if (isScrolling && scrollDirection === null) {
      setScrollDirection(delta > 0 ? 'right' : 'left');
    }

    /* Track when scrolling ends by setting a timeout and
     * clearing it on every scroll. When scrolling ends, the
     * last timeout will fire.
     */
    if (scrollId && scrollId.current) {
      clearTimeout(scrollId.current);
    }

    scrollId.current = setTimeout(() => {
      setIsScrolling(false);
      setScrollDirection(null);
    }, 100);
  };

  const cancelScrollToItem = () => {
    if (scrollToItem.current) {
      scrollToItem.current.stop();
    }
  };

  const cancelScrollToItemOnWheel = (e) => {
    if (scrollToItem.current && Math.abs(e.deltaX) > 0) {
      scrollToItem.current.stop();
    }
  };

  return (
    <motion.div
      id={id}
      className={[css.bookShelf, className || ''].join(' ')}
      ref={ref}
      animate={{
        visibility: isActive ? 'visible' : 'hidden',
      }}
      transition={{
        // In BookShelves, whenever isActive is toggled off, the books shuffle
        // after 3s to allow time for BookCards to hide
        delay: isActive ? 0 : 2.9,
        duration: 0,
      }}
      onScroll={handleScroll}
      onTouchStart={cancelScrollToItem}
      onMouseDown={cancelScrollToItem}
      onWheel={cancelScrollToItemOnWheel}
    >
      {books
        .filter(
          (book) =>
            book.sizes && book.sizes.medium && book.sizes.medium.sourceUrl,
        )
        .map((book) => {
          const randomVariation = book.id % 22;
          const ratio = book.sizes.medium.width / book.sizes.medium.height;
          const imageHeight = height - configs.GUTTER - randomVariation;
          const imageWidth = ratio * imageHeight;

          // const inView = booksInView.includes(book.id);

          return (
            <React.Fragment key={book.id}>
              <BookCard
                id={book.id}
                title={book.title}
                imageUrl={book.sizes.medium.sourceUrl}
                imageWidth={imageWidth}
                imageHeight={imageHeight}
                isScrolling={isScrolling}
                // isActive={isScrolling ? true : isActive && inView}
                isActive={isActive}
                animationDelay={index * 0.6}
                scrollDirection={scrollDirection}
                scrollDelta={scrollDeltaRef.current}
                containerElement={node}
                onClick={onClick}
                onRender={handleBookCardRender}
              />

              <BookSpines
                spines={book.spines}
                height={height}
                isScrolling={isScrolling}
                isActive={isActive}
                animationDelay={index * 0.6}
                scrollDirection={scrollDirection}
                scrollDelta={scrollDeltaRef.current}
              />
            </React.Fragment>
          );
        })}
    </motion.div>
  );
};

export default BookShelf;
