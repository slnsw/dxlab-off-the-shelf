import React from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import BookCards from '../components/BookCards';
import Modal from '../components/Modal';

import { withApollo } from '../lib/apollo';

import css from './index.scss';

const BOOKS = gql`
  {
    offTheShelf {
      books {
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

  const {
    // loading,
    error,
    // data = {
    //   offTheShelf: {
    //     books: [],
    //   },
    // },
    data,
  } = useQuery(BOOKS, {
    ssr: true,
  });

  if (error) {
    return error;
  }

  const books = data && data.offTheShelf && data.offTheShelf.books;

  const handleBookCardClick = (e, id) => {
    // console.log(e, id);

    // console.log(e.target.getBoundingClientRect());

    setInitialModalSize(e.target.getBoundingClientRect());
    setIsModalActive(true);
  };

  return (
    <>
      <Head>
        <title>Off the Shelf</title>
        <link rel="icon" href="/static/favicon.ico" importance="low" />
      </Head>

      <Modal
        isActive={isModalActive}
        initialSize={initialModalSize}
        onClose={() => setIsModalActive(false)}
      >
        Testing!!
      </Modal>

      <div className={css.bookShelf}>
        <BookCards
          books={books}
          className={css.bookCards}
          onClick={handleBookCardClick}
        ></BookCards>
        <BookCards
          books={books}
          className={css.bookCards}
          onClick={handleBookCardClick}
        ></BookCards>
        <BookCards
          books={books}
          className={css.bookCards}
          onClick={handleBookCardClick}
        ></BookCards>
      </div>
    </>
  );
};

export default withApollo(Home);
