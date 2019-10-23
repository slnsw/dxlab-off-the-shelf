import * as React from 'react';
// import { useMotionValue, useSpring } from 'framer-motion';

import BookShelf from '../BookShelf';

import useInterval from '../../lib/hooks/use-interval';
import useBooksData from '../../lib/hooks/use-books-data';
import knuthShuffle from '../../lib/knuthShuffle';
import { appConfig } from '../../configs';

import css from './BookShelves.scss';

type Props = {
  isHidden?: boolean;
  isIntervalActive?: boolean;
  className?: string;
  onBookClick?: Function;
};

const BookShelves: React.FunctionComponent<Props> = ({
  isHidden = false,
  isIntervalActive = false,
  className,
  onBookClick,
}) => {
  const [books, setBooks] = React.useState([]);
  const [currentBooks, setCurrentBooks] = React.useState([0, 0, 0]);
  const [currentShelf, setCurrentShelf] = React.useState(1);
  const [shelves, setShelves] = React.useState([[], [], []]);
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
  }, [isHidden]);
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
      console.log('Scroll shelf', currentShelf);

      const newShelf = Math.floor(Math.random() * 3);
      setCurrentShelf(newShelf);

      const amountToChange =
        Math.floor(
          Math.random() * (appConfig.scrollRangeMax - appConfig.scrollRangeMin),
        ) + appConfig.scrollRangeMin;
      let directionToChange = Math.random() < 0.5 ? -1 : 1;
      // console.log(currentBooks[currentShelf]);

      if (currentBooks[currentShelf] - amountToChange < 0) {
        directionToChange = 1;
      }

      if (
        currentBooks[currentShelf] + amountToChange >=
        shelves[currentShelf].length
      ) {
        directionToChange = -1;
      }

      let newCurrentBook =
        currentBooks[currentShelf] + directionToChange * amountToChange;

      if (newCurrentBook < 0) {
        newCurrentBook = 0;
      }

      if (newCurrentBook >= shelves[currentShelf].length) {
        newCurrentBook = shelves[currentShelf].length - 1;
      }

      setCurrentBooks([
        currentShelf === 0 ? newCurrentBook : currentBooks[0],
        currentShelf === 1 ? newCurrentBook : currentBooks[1],
        currentShelf === 2 ? newCurrentBook : currentBooks[2],
      ]);
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
            isHidden={isHidden}
            onClick={onBookClick}
            // onScroll={onShelfScroll}
          ></BookShelf>
          <BookShelf
            books={shelves[1]}
            scrollToBook={currentBooks[1]}
            index={1}
            id="bookShelf-1"
            className={css.bookShelf}
            isHidden={isHidden}
            onClick={onBookClick}
            // onScroll={onShelfScroll}
          ></BookShelf>
          <BookShelf
            books={shelves[2]}
            scrollToBook={currentBooks[2]}
            index={2}
            id="bookShelf-2"
            className={css.bookShelf}
            isHidden={isHidden}
            onClick={onBookClick}
            // onScroll={onShelfScroll}
          ></BookShelf>
        </>
      )}
    </div>
  );
};

export default BookShelves;
