import React from 'react';
import Head from 'next/head';

import BookCards from '../components/BookCards';
import BookCardModal from '../components/BookCardModal';

import { withApollo } from '../lib/apollo';
import useQuery from '../lib/hooks/use-query';

import css from './index.scss';

const BOOKS = /* GraphQL */ `
  {
    offTheShelf {
      books(limit: 100) {
        id
        title
        sizes {
          large {
            sourceUrl
            width
            height
          }
        }
      }
    }
  }
`;

const Home = () => {
  const [isModalActive, setIsModalActive] = React.useState(false);
  const [initialModalSize, setInitialModalSize] = React.useState();
  const [modalId, setModalId] = React.useState();

  const { loading, error, data } = useQuery(BOOKS, {
    ssr: true,
  });

  if (error) {
    console.log(error);

    return null;
  }

  const books = data && data.offTheShelf && data.offTheShelf.books;

  const handleBookCardClick = (e, id) => {
    // console.log(e, id);

    // console.log(e.target.getBoundingClientRect());

    setInitialModalSize(e.target.getBoundingClientRect());
    setModalId(id);
    setIsModalActive(true);
  };

  return (
    <>
      <Head>
        <title>Off the Shelf</title>
        <link rel="icon" href="/favicon.ico" importance="low" />
      </Head>

      {isModalActive && modalId && (
        <BookCardModal
          id={modalId}
          isActive={isModalActive}
          initialSize={initialModalSize}
          onClose={() => setIsModalActive(false)}
        ></BookCardModal>
      )}

      <div className={css.bookShelf}>
        {loading && 'Loading...'}

        {!loading && books && books.length > 0 && (
          <>
            <BookCards
              books={books.slice(0, 30)}
              className={css.bookCards}
              onClick={handleBookCardClick}
            ></BookCards>
            <BookCards
              books={books.slice(30, 60)}
              className={css.bookCards}
              onClick={handleBookCardClick}
            ></BookCards>
            <BookCards
              books={books.slice(60, 100)}
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
