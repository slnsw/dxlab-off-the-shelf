import React from 'react';
import Head from 'next/head';

import BookCardModal from '../components/BookCardModal';
import BookShelves from '../components/BookShelves';

import { withApollo } from '../lib/apollo';
// import useInterval from '../lib/hooks/use-interval';
// import useBooksData from '../lib/hooks/use-books-data';
// import knuthShuffle from '../lib/knuthShuffle';

// import css from './index.scss';

const Home = () => {
  const [isModalActive, setIsModalActive] = React.useState(false);
  const [initialModalSize, setInitialModalSize] = React.useState();
  const [modalId, setModalId] = React.useState();
  // const [books, setBooks] = React.useState([]);
  // const [currentBooks, setCurrentBooks] = React.useState([null, null, null]);
  // const [currentShelf, setCurrentShelf] = React.useState(1);
  // const [shelves, setShelves] = React.useState([[], [], []]);
  // // pull in the books
  // const { books: booksOnly, loading } = useBooksData();

  // React.useEffect(() => {
  //   const subset = 100;
  //   // randomly add spines
  //   const unshuffledBooks = booksOnly.slice(0, subset).map((book) => {
  //     const hasSpines = Math.random() < 0.5;
  //     const numSpines = hasSpines ? Math.floor(Math.random() * 4) + 1 : 0;
  //     const spines = [...Array(numSpines)].map(() => {
  //       return Math.floor(Math.random() * 96) + 1;
  //     });
  //     return { ...book, spines };
  //   });
  //   // shuffle them up
  //   setBooks(knuthShuffle(unshuffledBooks));
  //   // now split them across 3 shelves...
  //   const aThirdOfTheBooks = Math.floor(books.length / 3);
  //   setShelves([
  //     books.slice(0, aThirdOfTheBooks),
  //     books.slice(aThirdOfTheBooks, aThirdOfTheBooks * 2),
  //     books.slice(aThirdOfTheBooks * 2, books.length),
  //   ]);
  //   console.log(shelves[currentShelf]);
  // }, []);

  // console.log(books[5]);
  const handleBookCardClick = (e, id) => {
    // console.log(e, id);

    // console.log(e.target.getBoundingClientRect());

    setInitialModalSize(e.target.getBoundingClientRect());
    setModalId(id);
    setIsModalActive(true);
  };
  // const aThirdOfTheBooks = Math.floor(books.length / 3);

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
      <BookShelves onBookClick={handleBookCardClick}></BookShelves>
    </>
  );
};

export default withApollo(Home);
