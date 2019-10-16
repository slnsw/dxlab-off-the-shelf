import React from 'react';
import Head from 'next/head';

import BookCards from '../components/BookCards';
import BookCardModal from '../components/BookCardModal';

import { withApollo } from '../lib/apollo';
import useInterval from '../lib/hooks/use-interval';
import useBooksData from '../lib/hooks/use-books-data';
import knuthShuffle from '../lib/knuthShuffle';

import css from './index.scss';

const Home = () => {
  const [isModalActive, setIsModalActive] = React.useState(false);
  const [initialModalSize, setInitialModalSize] = React.useState();
  const [modalId, setModalId] = React.useState();
  const [books, setBooks] = React.useState([]);
  const [currentBooks, setCurrentBooks] = React.useState([null, null, null]);
  const [currentShelf, setCurrentShelf] = React.useState(1);
  const [shelfIds, setShelfIds] = React.useState([[], [], []]);
  // pull in the books
  const { books: booksOnly, loading } = useBooksData();

  React.useEffect(() => {
    // randomly add spines
    const unshuffledBooks = booksOnly.slice(0, 100).map((book) => {
      const hasSpines = Math.random() < 0.5;
      const numSpines = hasSpines ? Math.floor(Math.random() * 4) + 1 : 0;
      const spines = [...Array(numSpines)].map(() => {
        return Math.floor(Math.random() * 96) + 1;
      });
      return { ...book, spines };
    });
    // shuffle them up
    setBooks(knuthShuffle(unshuffledBooks));
    // now split them across 3 shelves...
  }, []);

  useInterval(() => {
    const num = Math.floor(Math.random() * books.length) + 1;
    const { id } = books[num];
    const el = document.getElementById(`bookCard-${id}`);

    if (el) {
      // el.scrollIntoView({ behavior: 'smooth' });
    }
  }, 5000);

  // console.log(books[5]);
  const handleBookCardClick = (e, id) => {
    // console.log(e, id);

    // console.log(e.target.getBoundingClientRect());

    setInitialModalSize(e.target.getBoundingClientRect());
    setModalId(id);
    setIsModalActive(true);
  };
  const aThirdOfTheBooks = Math.floor(books.length / 3);

  return (
    <>
      <Head>
        <title>Off the Shelf</title>
        <link rel="icon" href="/favicon.ico" importance="low" />
      </Head>

      <BookCardModal
        id={modalId}
        isActive={isModalActive}
        initialSize={initialModalSize}
        onClose={() => setIsModalActive(false)}
      />

      <div className={css.bookShelf}>
        {loading && 'Loading...'}

        {!loading && books && books.length > 0 && (
          <>
            <BookCards
              books={books.slice(0, aThirdOfTheBooks)}
              className={css.bookCards}
              onClick={handleBookCardClick}
            ></BookCards>
            <BookCards
              books={books.slice(aThirdOfTheBooks, aThirdOfTheBooks * 2)}
              className={css.bookCards}
              onClick={handleBookCardClick}
            ></BookCards>
            <BookCards
              books={books.slice(aThirdOfTheBooks * 2, books.length)}
              className={css.bookCards}
              onClick={handleBookCardClick}
            ></BookCards>
          </>
        )}
      </div>
    </>
  );
};

export default withApollo(Home);
