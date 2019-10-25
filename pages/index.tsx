import React from 'react';
import Router from 'next/router';

import BookCardModal from '../components/BookCardModal';
import AboutModal from '../components/AboutModal';
import BookShelves from '../components/BookShelves';
// import OffTheShelfLogo from '../components/OffTheShelfLogo';

import { withApollo } from '../lib/apollo';
import { createIdleTimer } from '../lib/idle-timer';
import * as configs from '../configs';
// import { useInterval } from '../lib/hooks';

// import css from './index.scss';

declare global {
  interface Window {
    OFF_THE_SHELF: any;
  }
}

const Home = ({ query, pathname }) => {
  // --------------------------------------------------------------------------
  // Hooks
  // --------------------------------------------------------------------------

  // Book Modal
  const [isModalActive, setIsModalActive] = React.useState(false);
  const [initialModalSize, setInitialModalSize] = React.useState();
  const [initialModalImageUrl, setInitialModalImageUrl] = React.useState(null);

  // About Modal
  const [isAboutModalActive, setIsAboutModalActive] = React.useState(false);
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
  const [isIntervalActive, setIsIntervalActive] = React.useState(true);
  const [isIntervalEnabled] = React.useState(configs.IS_INTERVAL_ENABLED);

  const bookId = query && query.id ? query.id : null;

  /*
   * Set idle timer to return to home after timeout.
   */
  React.useEffect(() => {
    const idleTimer = createIdleTimer(() => {
      if (bookId) {
        console.log('Home Page - idleTimer - return home');

        Router.push('/');
      }
    }, configs.IDLE_TIMEOUT);

    idleTimer.start();

    return () => {
      idleTimer.stop();
    };
  }, [bookId]);

  // Set initial logs
  React.useEffect(() => {
    if (!window.OFF_THE_SHELF) {
      console.log('----------------------------------------');
      window.OFF_THE_SHELF = Object.keys(configs).map((key) => {
        console.log(key, configs[key]);

        return `${key}: ${configs[key]}`;
      });
      console.log('----------------------------------------');
    }
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

      if (isIntervalEnabled) {
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
  }, [isIntervalEnabled]);
  /* eslint-enable */

  /*
   * Hide and show book modal
   */
  React.useEffect(() => {
    const isActive = Boolean(bookId);

    setIsModalActive(isActive);
    setIsIntervalActive(!isActive);
  }, [bookId, isIntervalEnabled]);

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
        isIntervalActive={isIntervalEnabled && isIntervalActive}
        onBookClick={handleBookCardClick}
      />
    </>
  );
};

Home.getInitialProps = ({ query, pathname }) => {
  return {
    query,
    pathname,
  };
};

export default withApollo(Home);
