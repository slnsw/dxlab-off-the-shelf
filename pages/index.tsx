import React from 'react';
import Router from 'next/router';

import BookCardModal from '../components/BookCardModal';
import BookShelves from '../components/BookShelves';
import OffTheShelfLogoText from '../components/OffTheShelfLogoText';

import { withApollo } from '../lib/apollo';
import { createIdleTimer } from '../lib/idle-timer';
import { appConfig } from '../configs';

import css from './index.scss';

const Home = ({ query }) => {
  // --------------------------------------------------------------------------
  // Hooks
  // --------------------------------------------------------------------------

  const [isModalActive, setIsModalActive] = React.useState(false);
  const [initialModalSize, setInitialModalSize] = React.useState();
  const [initialModalImageUrl, setInitialModalImageUrl] = React.useState(null);
  // Prevent interval from being triggered
  const [
    isIntervalDisabled,
    // setIsIntervalDisabled
  ] = React.useState(appConfig.isIntervalDisabled);
  const [isIntervalActive, setIsIntervalActive] = React.useState(true);

  const bookId = query && query.id ? query.id : null;

  /*
   * Set idle timer
   */
  React.useEffect(() => {
    const idleTimer = createIdleTimer(
      () => {
        Router.push('/');
      },
      appConfig.idleTimeout,
      { hasLogs: false },
    );

    idleTimer.start();

    return () => {
      idleTimer.stop();
    };
  }, []);

  /*
   * Ensure intervals don't run while page is off screen
   */
  React.useEffect(() => {
    // https://mattwest.design/working-with-the-page-visibility-api/
    document.addEventListener('visibilitychange', (e) => {
      const document = e.target as HTMLDocument;

      // console.log(document.hidden, document.visibilityState);

      if (isIntervalDisabled === false) {
        if (document.hidden || document.visibilityState === 'hidden') {
          if (isIntervalActive) {
            setIsIntervalActive(false);
          }
        } else if (isModalActive === false) {
          setIsIntervalActive(true);
        }
      }
    });
    /* eslint-disable */
  }, [isIntervalDisabled]);
  /* eslint-enable */

  /*
   * Hide and show book modal
   */
  React.useEffect(() => {
    const isActive = Boolean(bookId);

    setIsModalActive(isActive);

    if (isIntervalDisabled === false) {
      setIsIntervalActive(!isActive);
    }
  }, [bookId, isIntervalDisabled]);

  // --------------------------------------------------------------------------
  // Handlers
  // --------------------------------------------------------------------------

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

      <OffTheShelfLogoText isHidden={true} className={css.logo} />

      <BookShelves
        isHidden={false}
        isIntervalActive={
          isIntervalDisabled === false ? isIntervalActive : false
        }
        onBookClick={handleBookCardClick}
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
