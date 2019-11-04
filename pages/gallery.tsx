import React from 'react';
import Router from 'next/router';

import BookCardModal from '../components/BookCardModal';
import AboutModal from '../components/AboutModal';
import BookShelves from '../components/BookShelves';
import OffTheShelfLogo from '../components/OffTheShelfLogo';

import { withApollo } from '../lib/apollo';
import { createIdleTimer } from '../lib/idle-timer';
import { useInterval } from '../lib/hooks';
import { createHealthCheck } from '../lib/health-check';
import * as configs from '../configs';

import css from './index.scss';

declare global {
  interface Window {
    OFF_THE_SHELF: any;
  }
}

const GalleryPage = ({ query, pathname }) => {
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

  const position = query && query.position ? query.position : null;
  const basePathname = `/gallery${position ? `/${position}` : ''}`;

  const bookId = query && query.id ? query.id : null;
  const prevBookId = React.useRef(bookId);

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
          console.log('Gallery Page - idleTimer - return home');

          Router.push(pathname, basePathname);
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

    if (isActive) {
      // Store book id so AboutModal can remember to go back to it
      prevBookId.current = bookId;
    }
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
   * Set initial logs and health checks
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

    if (position === 'left' && process.env.OFF_THE_SHELF_LEFT_HEALTHCHECK_URL) {
      const healthCheck = createHealthCheck(
        process.env.OFF_THE_SHELF_LEFT_HEALTHCHECK_URL,
        120000,
      );

      healthCheck.start();
    } else if (
      position === 'right' &&
      process.env.OFF_THE_SHELF_RIGHT_HEALTHCHECK_URL
    ) {
      const healthCheck = createHealthCheck(
        process.env.OFF_THE_SHELF_RIGHT_HEALTHCHECK_URL,
        120000,
      );

      healthCheck.start();
    }
  }, []);

  // --------------------------------------------------------------------------
  // Handlers
  // --------------------------------------------------------------------------

  const handleBookCardClick = (e, { id, title, imageUrl }) => {
    // Router.push(`${pathname}?id=${id}`, `${basePathname}?id=${id}`);
    Router.push(`/gallery/[position]/book/[id]`, `${basePathname}/book/${id}`);

    setInitialModalSize(e.target.getBoundingClientRect());
    setInitialModalImageUrl(imageUrl);
  };

  return (
    <>
      <BookCardModal
        id={bookId}
        position={position}
        isActive={isModalActive}
        initialSize={initialModalSize}
        initialImageUrl={initialModalImageUrl}
        onClose={() => {
          Router.push('/gallery/[position]', basePathname);
        }}
      />

      <AboutModal
        isActive={isAboutModalActive}
        onClose={() => {
          Router.push(
            '/gallery/[position]/book/[id]',
            `${basePathname}/book/${prevBookId.current}`,
          );
        }}
      />

      <OffTheShelfLogo isActive={isLogoActive} className={css.logo} />

      <BookShelves
        position={position}
        isActive={areShelvesActive}
        isIntervalActive={isIntervalEnabled && isShelfIntervalActive}
        onBookClick={handleBookCardClick}
      />
    </>
  );
};

GalleryPage.getInitialProps = ({ query, pathname, res }) => {
  if (pathname === '/gallery') {
    if (res) {
      res.writeHead(302, {
        Location: '/gallery/test',
      });
      res.end();
    } else {
      Router.push('/gallery/test');
    }
  }

  return {
    query,
    pathname,
  };
};

export default withApollo(GalleryPage);
