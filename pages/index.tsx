import React from 'react';
import Head from 'next/head';
import Router from 'next/router';

import BookCardModal from '../components/BookCardModal';
import BookShelves from '../components/BookShelves';

import { withApollo } from '../lib/apollo';

// import css from './index.scss';

const Home = ({ query }) => {
  const [isModalActive, setIsModalActive] = React.useState(false);
  const [initialModalSize, setInitialModalSize] = React.useState();
  const bookId = query && query.id ? query.id : null;

  React.useEffect(() => {
    setIsModalActive(Boolean(bookId));
  }, [bookId]);

  const handleBookCardClick = (e, id) => {
    Router.push(`/?id=${id}`);

    setInitialModalSize(e.target.getBoundingClientRect());
    setIsModalActive(true);
  };

  return (
    <>
      <Head>
        <title>Off the Shelf</title>
        <link rel="icon" href="/favicon.ico" importance="low" />
      </Head>

      <BookCardModal
        id={bookId}
        isActive={isModalActive}
        initialSize={initialModalSize}
        onClose={() => {
          Router.push('/');
        }}
      />

      <BookShelves onBookClick={handleBookCardClick}></BookShelves>
    </>
  );
};

Home.getInitialProps = ({ query }) => {
  return {
    query,
  };
};

export default withApollo(Home);
