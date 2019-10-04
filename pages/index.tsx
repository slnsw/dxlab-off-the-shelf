import React from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import BookCards from '../components/BookCards';

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

  return (
    <div>
      <Head>
        <title>Off the Shelf</title>
        <link rel="icon" href="/static/favicon.ico" importance="low" />
      </Head>

      <div className={css.bookShelf}>
        <BookCards books={books} className={css.bookCards}></BookCards>
        <BookCards books={books} className={css.bookCards}></BookCards>
        <BookCards books={books} className={css.bookCards}></BookCards>
      </div>
    </div>
  );
};

export default withApollo(Home);
