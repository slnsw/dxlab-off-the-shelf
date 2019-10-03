import React from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import { withApollo } from '../lib/apollo';
// import { Query } from 'apollo-client';

import Nav from '../components/nav';

const BOOKS = gql`
  {
    offTheShelf {
      books {
        id
        title
      }
    }
  }
`;

const Home = () => {
  const {
    // loading,
    // error,
    // data = {
    //   offTheShelf: {
    //     books: [],
    //   },
    // },
    data,
  } = useQuery(BOOKS, {
    ssr: true,
  });

  // const { books } = data.offTheShelf;

  const books = data && data.offTheShelf && data.offTheShelf.books;

  console.log(books);

  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/static/favicon.ico" importance="low" />
      </Head>

      <Nav />

      <div className="hero">
        <h1 className="title">Off the Shelf</h1>
        {books &&
          books.map((book) => {
            return <p key={book.id}>{book.title}</p>;
          })}
      </div>

      <style jsx>{`
        .hero {
          width: 100%;
          color: #333;
        }
        .title {
          margin: 0;
          width: 100%;
          padding-top: 80px;
          line-height: 1.15;
          font-size: 48px;
        }
        .title,
        .description {
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default withApollo(Home);
