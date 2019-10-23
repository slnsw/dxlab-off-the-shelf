import React from 'react';
import Router from 'next/router';

import BookCardModal from '../components/BookCardModal';
import AboutModal from '../components/AboutModal';
import BookShelves from '../components/BookShelves';
// import OffTheShelfLogo from '../components/OffTheShelfLogo';

import { withApollo } from '../lib/apollo';
import { createIdleTimer } from '../lib/idle-timer';
import { appConfig } from '../configs';
// import { useInterval } from '../lib/hooks';

// import css from './index.scss';

const Home = ({ query }) => {
  // --------------------------------------------------------------------------
  // Hooks
  // --------------------------------------------------------------------------

  const [isModalActive, setIsModalActive] = React.useState(false);
  const [isAboutModalActive, setIsAboutModalActive] = React.useState(false);
  const [initialModalSize, setInitialModalSize] = React.useState();
  const [initialModalImageUrl, setInitialModalImageUrl] = React.useState(null);
  // const [
  //   isLogoActive,
  //   // setIsLogoActive
  // ] = React.useState(true);
  const [
    areShelvesActive,
    // setAreShelvesActive
  ] = React.useState(true);
  // const [
  //   // isLogoIntervalActive,
  //   // setIsLogoIntervalActive,
  // ] = React.useState(true);
  const [isIntervalDisabled] = React.useState(appConfig.isIntervalDisabled);
  const [isIntervalActive, setIsIntervalActive] = React.useState(true);

  const bookId = query && query.id ? query.id : null;

  /*
   * Set idle timer to disable intervals while user is interacting.
   */
  React.useEffect(() => {
    const idleTimer = createIdleTimer(
      () => {
        Router.push('/');
        setIsIntervalActive(true);
        // setIsLogoIntervalActive(true);
      },
      appConfig.idleTimeout,
      {
        hasLogs: false,
        onReset: () => {
          setIsIntervalActive(false);
          // setIsLogoIntervalActive(false);
        },
      },
    );

    idleTimer.start();

    return () => {
      idleTimer.stop();
    };
  }, []);

  // useInterval(
  //   () => {
  //     console.log('logoTimer');

  //     setIsLogoActive(true);
  //     setAreShelvesActive(false);
  //   },
  //   appConfig.logoTimeout,
  //   isLogoIntervalActive,
  // );

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
      <AboutModal
        isActive={isAboutModalActive}
        onClose={() => {
          setIsAboutModalActive(false);
          Router.push('/');
        }}
      />

      {/* <OffTheShelfLogo isActive={isLogoActive} className={css.logo} /> */}

      <BookShelves
        isActive={areShelvesActive}
        isIntervalActive={
          isIntervalDisabled === false ? isIntervalActive : false
        }
        onBookClick={handleBookCardClick}
      />
    </>
  );
};

Home.getInitialProps = ({ query }) => {
  return {
    query,
  };
};

export default withApollo(Home);
