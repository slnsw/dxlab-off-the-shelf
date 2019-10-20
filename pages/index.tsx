import React from 'react';
import Router from 'next/router';

import BookCardModal from '../components/BookCardModal';
import BookShelves from '../components/BookShelves';

import { withApollo } from '../lib/apollo';

// import css from './index.scss';

const Home = ({ query }) => {
  const [isModalActive, setIsModalActive] = React.useState(false);
  const [initialModalSize, setInitialModalSize] = React.useState();
  const [initialModalImageUrl, setInitialModalImageUrl] = React.useState(null);
  const [isIntervalActive, setIsIntervalActive] = React.useState(false);
  const bookId = query && query.id ? query.id : null;

  React.useEffect(() => {
    // https://mattwest.design/working-with-the-page-visibility-api/
    document.addEventListener('visibilitychange', (e) => {
      const document = e.target as HTMLDocument;

      if (document.hidden) {
        if (isIntervalActive) {
          setIsIntervalActive(false);
        }
      } else if (isModalActive === false) {
        setIsIntervalActive(true);
      }
    });
    /* eslint-disable */
  }, []);
  /* eslint-enable */

  React.useEffect(() => {
    const isActive = Boolean(bookId);

    setIsModalActive(isActive);
    setIsIntervalActive(!isActive);
  }, [bookId]);

  const handleBookCardClick = (e, { id, title, imageUrl }) => {
    Router.push(`/?id=${id}`);

    setInitialModalSize(e.target.getBoundingClientRect());
    setInitialModalImageUrl(imageUrl);
  };

  return (
    <>
      <BookCardModal
        id={bookId}
        isActive={isModalActive}
        initialSize={initialModalSize}
        initialImageUrl={initialModalImageUrl}
        onClose={() => {
          Router.push('/');
        }}
      />

      <BookShelves
        onBookClick={handleBookCardClick}
        isIntervalActive={isIntervalActive}
        // isIntervalActive={false}
      ></BookShelves>
    </>
  );
};

Home.getInitialProps = ({ query }) => {
  return {
    query,
  };
};

export default withApollo(Home);
