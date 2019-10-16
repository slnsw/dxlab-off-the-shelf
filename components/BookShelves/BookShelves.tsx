import * as React from 'react';

import BookShelf from '../BookShelf';

import useInterval from '../../lib/hooks/use-interval';
import useBooksData from '../../lib/hooks/use-books-data';
import knuthShuffle from '../../lib/knuthShuffle';

import css from './BookShelves.scss';

type Props = {
  className?: string;
  onBookClick?: Function;
};

const BookShelves: React.FunctionComponent<Props> = ({
  className,
  onBookClick,
}) => {
  const [books, setBooks] = React.useState([]);
  const [currentBooks, setCurrentBooks] = React.useState([20, 20, 20]);
  const [currentShelf, setCurrentShelf] = React.useState(1);
  const [shelves, setShelves] = React.useState([[], [], []]);
  // pull in the books
  const { books: booksOnly, loading } = useBooksData();

  React.useEffect(() => {
    const subset = 200;
    // randomly add spines
    const unshuffledBooks = booksOnly.slice(0, subset).map((book) => {
      const hasSpines = Math.random() < 0.5;
      const numSpines = hasSpines ? Math.floor(Math.random() * 4) + 1 : 0;
      const spines = [...Array(numSpines)].map(() => {
        return Math.floor(Math.random() * 96) + 1;
      });
      return { ...book, spines };
    });
    // shuffle them up
    setBooks(knuthShuffle(unshuffledBooks));
    /* eslint-disable */
  }, []);
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

  // console.log(shelves[currentShelf]);

  useInterval(() => {
    setCurrentShelf(Math.floor(Math.random() * 3));
    const amountToChange = Math.floor(Math.random() * 6) + 6;
    const directionToChange = Math.random() < 0.5 ? -1 : 1;
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
    // const num = Math.floor(Math.random() * books.length);
    const { id } = shelves[currentShelf][newCurrentBook];
    const el = document.getElementById(`bookCard-${id}`);

    if (el) {
      // console.log(`Shelf: ${currentShelf}`);
      // console.log(`dir: ${directionToChange}`);
      // console.log(`amt: ${amountToChange}`);
      // console.log(currentBooks);
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, 4000);

  return (
    <div className={[css.bookShelves, className || ''].join(' ')}>
      {loading && 'Loading...'}

      {!loading && books && books.length > 0 && (
        <>
          <BookShelf
            key={1}
            books={shelves[0]}
            className={css.bookShelf}
            onClick={onBookClick}
          ></BookShelf>
          <BookShelf
            key={2}
            books={shelves[1]}
            className={css.bookShelf}
            onClick={onBookClick}
          ></BookShelf>
          <BookShelf
            key={3}
            books={shelves[2]}
            className={css.bookShelf}
            onClick={onBookClick}
          ></BookShelf>
        </>
      )}
    </div>
  );
};

export default BookShelves;
