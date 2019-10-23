import * as React from 'react';
// import { useMotionValue, useSpring } from 'framer-motion';

import BookShelf from '../BookShelf';

import useInterval from '../../lib/hooks/use-interval';
import useBooksData from '../../lib/hooks/use-books-data';
import knuthShuffle from '../../lib/knuthShuffle';
import { appConfig } from '../../configs';

import css from './BookShelves.scss';

type Props = {
  isActive?: boolean;
  isIntervalActive?: boolean;
  className?: string;
  onBookClick?: Function;
};

const BookShelves: React.FunctionComponent<Props> = ({
  isActive = false,
  isIntervalActive = false,
  className,
  onBookClick,
}) => {
  const [books, setBooks] = React.useState([]);
  const [currentBooks, setCurrentBooks] = React.useState([0, 0, 0]);
  const [currentShelfIndex, setCurrentShelfIndex] = React.useState(1);
  const [shelves, setShelves] = React.useState([[], [], []]);
  const allBooksInViewRef = React.useRef([[], [], []]);
  const allBooksInView = allBooksInViewRef.current;
  // Fetch books data
  const { books: booksOnly, loading } = useBooksData();

  React.useEffect(() => {
    const subset = appConfig.numberOfBooksToDisplay;

    // randomly add spines
    const unshuffledBooks = booksOnly.slice(0, subset).map((book) => {
      const hasSpines = Math.random() < appConfig.hasSpinesProbability;
      const numSpines = hasSpines
        ? Math.floor(Math.random() * appConfig.maxNumberOfSpines) + 1
        : 0;
      const spines = [...Array(numSpines)].map(() => {
        return Math.floor(Math.random() * appConfig.numberOfSpines) + 1;
      });
      return { ...book, spines };
    });

    // shuffle them up
    setBooks(knuthShuffle(unshuffledBooks));
    /* eslint-disable */
  }, [isActive]);
  /* eslint-enable */

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
          Math.random() * (appConfig.scrollRangeMax - appConfig.scrollRangeMin),
        ) + appConfig.scrollRangeMin;
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

      if (newCurrentBook >= currentShelf.length) {
        newCurrentBook = currentShelf.length - 1;
      }

      setCurrentBooks([
        currentShelfIndex === 0 ? newCurrentBook : currentBooks[0],
        currentShelfIndex === 1 ? newCurrentBook : currentBooks[1],
        currentShelfIndex === 2 ? newCurrentBook : currentBooks[2],
      ]);

      console.log(
        'Scroll shelf',
        currentShelfIndex,
        ' Moving from book ',
        currentBookIndex,
        ' to ',
        newCurrentBook,
      );

      const newShelf = Math.floor(Math.random() * 3);
      setCurrentShelfIndex(newShelf);
    },
    appConfig.timeBetweenScrolls,
    isIntervalActive,
  );

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
            // onScroll={onShelfScroll}
          ></BookShelf>
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
            // onScroll={onShelfScroll}
          ></BookShelf>
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
            // onScroll={onShelfScroll}
          ></BookShelf>
        </>
      )}
    </div>
  );
};

export default BookShelves;
