import React from 'react';
import Head from 'next/head';

import BookCardModal from '../components/BookCardModal';
import BookShelves from '../components/BookShelves';

import { withApollo } from '../lib/apollo';

// import css from './index.scss';

const Home = ({ id }) => {
  const [isModalActive, setIsModalActive] = React.useState(false);
  const [initialModalSize, setInitialModalSize] = React.useState();
  const [modalId, setModalId] = React.useState();

  if (id) {
    console.log('book');
  }

  const handleBookCardClick = (e, bookCardId) => {
    setInitialModalSize(e.target.getBoundingClientRect());
    setModalId(bookCardId);
    setIsModalActive(true);
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
        onClose={() => setIsModalActive(false)}
      />

      <BookShelves onBookClick={handleBookCardClick}></BookShelves>
    </>
  );
};

export default withApollo(Home);
