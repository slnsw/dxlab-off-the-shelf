import * as React from 'react';
// import shuffle from 'lodash.shuffle';

import BookShelf from '../BookShelf';
import Loader from '../Loader';

import useInterval from '../../lib/hooks/use-interval';
// import useTimeout from '../../lib/hooks/use-timeout';
import useBooksData from '../../lib/hooks/use-books-data';
import { usePrevious } from '../../lib/hooks';
import knuthShuffle from '../../lib/knuthShuffle';
import * as configs from '../../configs';

import css from './BookShelves.module.scss';

type Props = {
  isActive?: boolean;
  isIntervalActive?: boolean;
  position?: 'left' | 'right' | 'test';
  // basePathnameAs: string;
  // basePathnameHref: string;
  booksTotal?: number;
  mode: 'gallery' | 'web';
  className?: string;
  onBookClick?: Function;
};

const BookShelves: React.FunctionComponent<Props> = ({
  isActive = false,
  isIntervalActive = false,
  position = 'left',
  // basePathnameAs,
  // basePathnameHref,
  booksTotal = configs.NUMBER_OF_BOOKS_TO_DISPLAY,
  mode = 'gallery',
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
    const subset = booksTotal;
    const halfWay = Math.floor(booksOnly.length / 2);

    // randomly add spines
    const allUnshuffledBooks = booksOnly.map((book) => {
      const hasSpines = Math.random() < configs.HAS_SPINES_PROBABILITY;
      const numSpines = hasSpines
        ? Math.floor(Math.random() * configs.MAX_NUMBER_OF_SPINES) + 1
        : 0;
      const spines = [...Array(numSpines)].map(() => {
        return Math.floor(Math.random() * configs.NUMBER_OF_SPINES) + 1;
      });
      return { ...book, spines };
    });

    // Pick a half depending on kiosk (left/right) unless we are the website in which case don't.
    const unshuffledBooks = position
      ? allUnshuffledBooks.slice(
          position === 'left' ? 0 : halfWay + 1,
          position === 'left' ? halfWay : booksOnly.length,
        )
      : allUnshuffledBooks;

    // Shuffle them up and display a subset
    setBooks(knuthShuffle(unshuffledBooks).slice(0, subset));
    // setBooks(shuffle(unshuffledBooks).slice(0, subset));
  };

  React.useEffect(() => {
    console.log('BookShelves - position', position);

    shuffleBooks();
  }, [JSON.stringify(booksOnly)]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (prevIsActive && !isActive) {
        shuffleBooks();
      }

      return () => {
        clearTimeout(timeout);
      };
    }, configs.SHUFFLE_TIMEOUT + 1500);
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

      if (!currentBooksInView.includes(currentShelf[currentBookIndex].id)) {
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

      if (newCurrentBook >= currentShelf.length - 8) {
        newCurrentBook = currentShelf.length - 8;
      }

      console.log(
        'Scroll shelf',
        currentShelfIndex,
        '- moving from book',
        currentBookIndex,
        'to',
        newCurrentBook,
      );

      setCurrentBooks([
        currentShelfIndex === 0 ? newCurrentBook : currentBooks[0],
        currentShelfIndex === 1 ? newCurrentBook : currentBooks[1],
        currentShelfIndex === 2 ? newCurrentBook : currentBooks[2],
      ]);

      const newShelf = Math.floor(Math.random() * 3);
      setCurrentShelfIndex(newShelf);
    },
    configs.TIME_BETWEEN_SCROLLS,
    isIntervalActive,
  );

  const hasHeader = mode === 'web';

  if (loading) {
    return (
      <Loader isActive={true} strokeWidth={2} className={css.loader}></Loader>
    );
  }

  return (
    <div
      className={[
        css.bookShelves,
        hasHeader ? css.hasHeader : '',
        className || '',
      ].join(' ')}
    >
      {!loading && books && books.length > 0 && (
        <>
          <BookShelf
            books={shelves[0]}
            scrollToBook={currentBooks[0]}
            index={0}
            id="bookShelf-0"
            // basePathnameAs={basePathnameAs}
            // basePathnameHref={basePathnameHref}
            isActive={isActive}
            mode={mode}
            className={css.bookShelf}
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
            // basePathnameAs={basePathnameAs}
            // basePathnameHref={basePathnameHref}
            isActive={isActive}
            mode={mode}
            className={css.bookShelf}
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
            // basePathnameAs={basePathnameAs}
            // basePathnameHref={basePathnameHref}
            isActive={isActive}
            mode={mode}
            className={css.bookShelf}
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
