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
  const [modalId, setModalId] = React.useState();

  React.useEffect(() => {
    setModalId(query.id);
    setIsModalActive(Boolean(query.id));
  }, [query.id]);

  const handleBookCardClick = (e, bookCardId) => {
    Router.push(`/?id=${bookCardId}`);

    setInitialModalSize(e.target.getBoundingClientRect());
    setIsModalActive(true);
    // setModalId(bookCardId);
  };

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
