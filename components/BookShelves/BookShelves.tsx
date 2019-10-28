import * as React from 'react';
// import { useMotionValue, useSpring } from 'framer-motion';

import BookShelf from '../BookShelf';

import useInterval from '../../lib/hooks/use-interval';
import useBooksData from '../../lib/hooks/use-books-data';
import { usePrevious } from '../../lib/hooks';
import knuthShuffle from '../../lib/knuthShuffle';
import * as configs from '../../configs';

import css from './BookShelves.scss';

type Props = {
  isActive?: boolean;
  isIntervalActive?: boolean;
  // shouldShuffle?: boolean;
  className?: string;
  onBookClick?: Function;
};

const BookShelves: React.FunctionComponent<Props> = ({
  isActive = false,
  isIntervalActive = false,
  // shouldShuffle = false,
  className,
  onBookClick,
}) => {
  const [books, setBooks] = React.useState([]);
  const [currentBooks, setCurrentBooks] = React.useState([0, 0, 0]);
  const [currentShelfIndex, setCurrentShelfIndex] = React.useState(1);
  const [shelves, setShelves] = React.useState([[], [], []]);
  const allBooksInViewRef = React.useRef([[], [], []]);
  const allBooksInView = allBooksInViewRef.current;
  const prevIsActive = usePrevious(isActive);

  // Fetch books data
  const { books: booksOnly, loading } = useBooksData();

  const shuffleBooks = () => {
    console.log('Shuffle books');

    const subset = configs.NUMBER_OF_BOOKS_TO_DISPLAY;
    // const side = 'left'; // replace these later with URL parameter XXXXXXX TO DO
    const side = 'right';
    const halfWay = Math.floor(booksOnly.length / 2);

    // pick a half depedning on kiosk and randomly add spines
    const unshuffledBooks = booksOnly
      .slice(
        side === 'left' ? 0 : halfWay + 1,
        side === 'left' ? halfWay : booksOnly.length,
      )
      .map((book) => {
        const hasSpines = Math.random() < configs.HAS_SPINES_PROBABILITY;
        const numSpines = hasSpines
          ? Math.floor(Math.random() * configs.MAX_NUMBER_OF_SPINES) + 1
          : 0;
        const spines = [...Array(numSpines)].map(() => {
          return Math.floor(Math.random() * configs.NUMBER_OF_SPINES) + 1;
        });
        return { ...book, spines };
      });

    // shuffle them up and display a subset
    setBooks(knuthShuffle(unshuffledBooks).slice(0, subset));
  };

  React.useEffect(() => {
    shuffleBooks();

    /* eslint-disable */
  }, []);
  /* eslint-enable */

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (prevIsActive && !isActive) {
        shuffleBooks();
      }

      return () => {
        clearTimeout(timeout);
      };
    }, 3000);
  }, [isActive]);

  React.useEffect(() => {
    // now split them across 3 shelves...
    const aThirdOfTheBooks = Math.floor(books.length / 3);
    setShelves([
      books.slice(0, aThirdOfTheBooks),
      books.slice(aThirdOfTheBooks, aThirdOfTheBooks * 2),
      books.slice(aThirdOfTheBooks * 2, books.length),
    ]);
  }, [books]);

  useInterval(
    () => {
      let currentBookIndex = currentBooks[currentShelfIndex];
      const currentShelf = shelves[currentShelfIndex];
      const currentBooksInView = allBooksInView[currentShelfIndex];

      if (!currentBooksInView.includes(currentShelf[currentBookIndex])) {
        currentBookIndex = currentShelf.findIndex((value) => {
          return value.id === currentBooksInView[0];
        });
      }

      const amountToChange =
        Math.floor(
          Math.random() * (configs.SCROLL_RANGE_MAX - configs.SCROLL_RANGE_MIN),
        ) + configs.SCROLL_RANGE_MIN;

      let directionToChange = Math.random() < 0.5 ? -1 : 1;

      if (currentBookIndex - amountToChange < 0) {
        directionToChange = 1;
      }

      if (currentBookIndex + amountToChange >= currentShelf.length) {
        directionToChange = -1;
      }

      let newCurrentBook =
        currentBookIndex + directionToChange * amountToChange;

      if (newCurrentBook < 0) {
        newCurrentBook = 0;
      }

      if (newCurrentBook >= currentShelf.length - 5) {
        newCurrentBook = currentShelf.length - 5;
      }

      setCurrentBooks([
        currentShelfIndex === 0 ? newCurrentBook : currentBooks[0],
        currentShelfIndex === 1 ? newCurrentBook : currentBooks[1],
        currentShelfIndex === 2 ? newCurrentBook : currentBooks[2],
      ]);

      console.log(
        'Scroll shelf',
        currentShelfIndex,
        '- moving from book',
        currentBookIndex,
        'to',
        newCurrentBook,
      );

      const newShelf = Math.floor(Math.random() * 3);
      setCurrentShelfIndex(newShelf);
    },
    configs.TIME_BETWEEN_SCROLLS,
    isIntervalActive,
  );

  React.useEffect(() => {
    console.log('BookShelves - isIntervalActive', isIntervalActive);
  }, [isIntervalActive]);

  return (
    <div className={[css.bookShelves, className || ''].join(' ')}>
      {loading && 'Loading...'}

      {!loading && books && books.length > 0 && (
        <>
          <BookShelf
            books={shelves[0]}
            scrollToBook={currentBooks[0]}
            index={0}
            id="bookShelf-0"
            className={css.bookShelf}
            isActive={isActive}
            onClick={onBookClick}
            onRender={(booksInView) => {
              allBooksInView[0] = booksInView;
            }}
          />
          <BookShelf
            books={shelves[1]}
            scrollToBook={currentBooks[1]}
            index={1}
            id="bookShelf-1"
            className={css.bookShelf}
            isActive={isActive}
            onClick={onBookClick}
            onRender={(booksInView) => {
              allBooksInView[1] = booksInView;
            }}
          />
          <BookShelf
            books={shelves[2]}
            scrollToBook={currentBooks[2]}
            index={2}
            id="bookShelf-2"
            className={css.bookShelf}
            isActive={isActive}
            onClick={onBookClick}
            onRender={(booksInView) => {
              allBooksInView[2] = booksInView;
            }}
          />
        </>
      )}
    </div>
  );
};

export default BookShelves;
