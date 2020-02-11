import React from 'react';
import Router from 'next/router';

import Header from '../Header';
import BookCardModal from '../BookCardModal';
import AboutModal from '../AboutModal';
import BookShelves from '../BookShelves';
import OffTheShelfLogo from '../OffTheShelfLogo';

import { createIdleTimer } from '../../lib/idle-timer';
import { useInterval, useDocumentVisibility } from '../../lib/hooks';
import * as configs from '../../configs';

import css from './OffTheShelfApp.scss';
import Loader from '../Loader';

declare global {
  interface Window {
    OFF_THE_SHELF: any;
  }
}

type Props = {
  query: {
    position: string;
    id: string;
    page: string;
  };
  position?: 'left' | 'right' | 'test';
  basePathnameAs: string;
  basePathnameHref: string;
  mode: 'gallery' | 'web';
  booksTotal?: number;
};

const OffTheShelfApp: React.FunctionComponent<Props> = ({
  query,
  position = null,
  basePathnameAs,
  basePathnameHref = '/gallery/[position]',
  mode = 'gallery',
  booksTotal = 200,
}) => {
  // --------------------------------------------------------------------------
  // Hooks
  // --------------------------------------------------------------------------

  const enablePrevBookId = mode === 'gallery';
  const hasHeader = mode === 'web';

  // Book Modal
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

  // Loader
  const [isLoaderActive, setIsLoaderActive] = React.useState(false);

  // Randomising
  const [isRandomising, setIsRandomising] = React.useState(false);

  const bookId = query && query.id ? query.id : null;
  const prevBookId = React.useRef(bookId);

  const isAboutModalActive =
    query && query.page && query.page === 'about' ? true : null;
  const isModalActive = Boolean(bookId);

  // memory monitoring
  useInterval(() => {
    if (window.performance && window.performance.memory) {
      console.log(
        `JSHeapSize: total: ${humanFileSize(
          performance.memory.totalJSHeapSize,
          true,
        )} used: ${humanFileSize(
          performance.memory.usedJSHeapSize,
          true,
        )} Limit:${humanFileSize(performance.memory.jsHeapSizeLimit, true)}`,
      );
    }
  }, 5000);

  function humanFileSize(bytes, si) {
    var thresh = si ? 1000 : 1024;
    if (Math.abs(bytes) < thresh) {
      return bytes + ' B';
    }
    var units = si
      ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    var u = -1;
    do {
      bytes /= thresh;
      ++u;
    } while (Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(1) + ' ' + units[u];
  }

  /*
   * Set idle timer to return to home after timeout.
   */
  React.useEffect(() => {
    if (mode === 'gallery') {
      const idleTimer = createIdleTimer(
        () => {
          // Callback to run after user hasn't used screen for a while
          if (bookId || isAboutModalActive) {
            console.log('Gallery Page - idleTimer - return home');

            Router.push(basePathnameHref, basePathnameAs);
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
    }

    if (mode === 'web') {
      const idleTimer = createIdleTimer(
        () => {
          if (!(bookId || isAboutModalActive)) {
            setIsIdleLoopActive(true);
          }
        },
        configs.WEB_IDLE_TIMEOUT,
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
    }

    return () => {};
  }, [bookId, isAboutModalActive, mode]);

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
      console.log('idleLoopCommand', 'hide books', 'outro');

      setIsShelfIntervalActive(false);
      setAreShelvesActive(false);
    },
    null,
  ];

  useInterval(
    () => {
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
   * Take care of book modal
   */
  React.useEffect(() => {
    setIsShelfIntervalActive(!isModalActive);
    setIsIdleLoopActive(!isModalActive);

    if (isModalActive) {
      // Store book id so AboutModal can remember to go back to it
      prevBookId.current = bookId;
    }
  }, [isModalActive, isIntervalEnabled]);

  /*
   * Take care of About modal
   */
  React.useEffect(() => {
    setIsShelfIntervalActive(!isAboutModalActive);
    setIsIdleLoopActive(!isAboutModalActive);
  }, [isAboutModalActive]);

  /*
   * Ensure intervals don't run while page is off screen
   */
  useDocumentVisibility((e) => {
    const document = e.target as HTMLDocument;

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

  // --------------------------------------------------------------------------
  // Handlers
  // --------------------------------------------------------------------------

  const reRandomiseBooks = (e) => {
    setIsRandomising(true);
    // Show loader
    setIsLoaderActive(true);
    // Stop books from scrolling
    setIsShelfIntervalActive(false);
    // Hide books
    setAreShelvesActive(false);
    // Reset idleLoop
    setIdleLoopCommandIndex(7);
    // Hide logo
    setIsLogoActive(false);

    setTimeout(() => {
      setIsRandomising(false);
      setIsLoaderActive(false);
      setIsShelfIntervalActive(true);
      setAreShelvesActive(true);
    }, configs.SHUFFLE_TIMEOUT + 2500);
  };

  const handleBookCardClick = (e, { id, title, imageUrl }) => {
    setInitialModalSize(e.target.getBoundingClientRect());
    setInitialModalImageUrl(imageUrl);
  };

  return (
    <div
      style={{
        height: '100%',
      }}
      className={mode === 'gallery' ? 'gallery-version' : ''}
    >
      {hasHeader && (
        <Header
          basePathnameHref={basePathnameHref}
          basePathnameAs={basePathnameAs}
          isRandomButtonDisabled={isRandomising}
          onRandomClick={reRandomiseBooks}
        ></Header>
      )}

      <Loader
        isActive={isLoaderActive}
        strokeWidth={2}
        className={css.loader}
      />

      <BookCardModal
        id={parseInt(bookId, 10)}
        position={position}
        isActive={isModalActive}
        initialSize={initialModalSize}
        initialImageUrl={initialModalImageUrl}
        mode={mode}
        onClose={() => {
          if (mode === 'web') {
            setIdleLoopCommandIndex(15);
          }
          Router.push(basePathnameHref, basePathnameAs);
        }}
      />

      <AboutModal
        isActive={isAboutModalActive}
        mode={mode}
        onClose={() => {
          if (prevBookId.current && enablePrevBookId) {
            if (mode === 'web') {
              setIdleLoopCommandIndex(15);
            }
            Router.push(
              `${basePathnameHref}/book/[id]`,
              `${basePathnameAs}/book/${prevBookId.current}`,
            );
          } else {
            Router.push(basePathnameHref);
          }
        }}
      />

      <OffTheShelfLogo
        // Ensure logo doesn't show if shelves are active
        isActive={isLogoActive && areShelvesActive === false}
        className={css.logo}
        size={mode === 'web' ? 'sm' : 'md'}
      />

      <BookShelves
        position={position}
        basePathnameHref={basePathnameHref}
        basePathnameAs={basePathnameAs}
        // While randomising, ensure shelves aren't active
        isActive={isRandomising ? false : areShelvesActive}
        isIntervalActive={isIntervalEnabled && isShelfIntervalActive}
        booksTotal={booksTotal}
        onBookClick={handleBookCardClick}
        mode={mode}
      />
    </div>
  );
};

export default OffTheShelfApp;
