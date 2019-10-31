import React from 'react';
import Router from 'next/router';

import BookCardModal from '../components/BookCardModal';
import AboutModal from '../components/AboutModal';
import BookShelves from '../components/BookShelves';
import OffTheShelfLogo from '../components/OffTheShelfLogo';

import { withApollo } from '../lib/apollo';
import { createIdleTimer } from '../lib/idle-timer';
import { useInterval } from '../lib/hooks';
import * as configs from '../configs';

import css from './index.scss';

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

  // Logo
  const [isLogoActive, setIsLogoActive] = React.useState(false);

  // Book Shelves
  const [areShelvesActive, setAreShelvesActive] = React.useState(false);
  const [isShelfIntervalActive, setIsShelfIntervalActive] = React.useState(
    false,
  );
  const [isIntervalEnabled] = React.useState(configs.IS_INTERVAL_ENABLED);

  // Idle Loop
  const [idleLoopCommandIndex, setIdleLoopCommandIndex] = React.useState(0);
  const [isIdleLoopActive, setIsIdleLoopActive] = React.useState(true);

  const bookShelvesId = query && query.side ? query.side : 'left';
  const bookId = query && query.id ? query.id : null;
  const isAboutModalActive =
    query && query.page && query.page === 'about' ? true : null;

  /*
   * Set idle timer to return to home after timeout.
   */
  React.useEffect(() => {
    const idleTimer = createIdleTimer(
      () => {
        // Callback to run after user hasn't used screen for a while
        if (bookId || isAboutModalActive) {
          console.log('Home Page - idleTimer - return home');

          Router.push(`/?side=${bookShelvesId}`);
        }

        setIsIdleLoopActive(true);
      },
      configs.IDLE_TIMEOUT,
      {
        onReset: () => {
          setIsLogoActive(false);
          setAreShelvesActive(true);

          if (isIdleLoopActive) {
            setIsIdleLoopActive(false);
          }
        },
      },
    );

    idleTimer.start();

    return () => {
      idleTimer.stop();
    };
  }, [bookId, isAboutModalActive]);

  /*
   * Idle loop with commands that run in a sequence
   */
  const idleLoopCommands = [
    () => {
      console.log('idleLoopCommand', 'show logo');

      setIsShelfIntervalActive(false);
      setIsLogoActive(true);
    },
    null,
    null,
    () => {
      console.log('idleLoopCommand', 'hide logo');

      setIsShelfIntervalActive(false);
      setIsLogoActive(false);
    },
    null,
    () => {
      console.log('idleLoopCommand', 'show books');

      setIsShelfIntervalActive(true);
      setAreShelvesActive(true);
    },
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    () => {
      console.log('idleLoopCommand', 'hide books');

      setIsShelfIntervalActive(false);
      setAreShelvesActive(false);
    },
    null,
  ];

  useInterval(
    () => {
      // console.log('idleLoopCommandIndex', idleLoopCommandIndex);

      const command = idleLoopCommands[idleLoopCommandIndex];

      if (typeof command === 'function') {
        command();
      }

      if (idleLoopCommandIndex === idleLoopCommands.length - 1) {
        setIdleLoopCommandIndex(0);
      } else {
        setIdleLoopCommandIndex(idleLoopCommandIndex + 1);
      }
    },
    2000,
    isIdleLoopActive,
  );

  /*
   * Hide and show book modal
   */
  React.useEffect(() => {
    const isActive = Boolean(bookId);

    setIsModalActive(isActive);
    setIsShelfIntervalActive(!isActive);
  }, [bookId, isIntervalEnabled]);

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
          if (isShelfIntervalActive) {
            setIsShelfIntervalActive(false);
            setIsIdleLoopActive(false);
          }
        } else if (isModalActive === false) {
          setIsShelfIntervalActive(true);
          setIsIdleLoopActive(true);
        }
      }
    });
  }, [isIntervalEnabled]);

  /*
   * Set initial logs
   */
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

  // --------------------------------------------------------------------------
  // Handlers
  // --------------------------------------------------------------------------

  const handleBookCardClick = (e, { id, title, imageUrl }) => {
    // Router.push(`/?id=${id}`);
    Router.push(`/?side=${bookShelvesId}&id=${id}`);

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
          // Router.push('/');
          Router.push(`/?side=${bookShelvesId}`);
        }}
      />

      <AboutModal
        isActive={isAboutModalActive}
        onClose={() => {
          // Router.push(`/?id=${bookId}`);
          Router.push(`/?side=${bookShelvesId}&id=${bookId}`);
        }}
      />

      <OffTheShelfLogo isActive={isLogoActive} className={css.logo} />

      <BookShelves
        id={bookShelvesId}
        isActive={areShelvesActive}
        isIntervalActive={isIntervalEnabled && isShelfIntervalActive}
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
