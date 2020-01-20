import React from 'react';
import Router from 'next/router';

import Header from '../Header';
import BookCardModal from '../BookCardModal';
import AboutModal from '../AboutModal';
import BookShelves from '../BookShelves';
import OffTheShelfLogo from '../OffTheShelfLogo';

import { createIdleTimer } from '../../lib/idle-timer';
import { useInterval } from '../../lib/hooks';
import * as configs from '../../configs';

import css from './OffTheShelfApp.scss';

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
  booksTotal: number;
  hasHeader?: boolean;
};

const OffTheShelfApp: React.FunctionComponent<Props> = ({
  query,
  position = null,
  basePathnameAs,
  basePathnameHref = '/gallery/[position]',
  booksTotal,
  hasHeader = false,
}) => {
  // --------------------------------------------------------------------------
  // Hooks
  // --------------------------------------------------------------------------

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

  // const position = query && query.position ? query.position : null;
  // const basePathname = `/gallery/${position}`;

  const bookId = query && query.id ? query.id : null;
  const prevBookId = React.useRef(bookId);

  const isAboutModalActive =
    query && query.page && query.page === 'about' ? true : null;
  const isModalActive = Boolean(bookId);

  /*
   * Set idle timer to return to home after timeout.
   */
  React.useEffect(() => {
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
   * Take care of book modal
   */
  React.useEffect(() => {
    setIsShelfIntervalActive(!isModalActive);

    if (isModalActive) {
      // Store book id so AboutModal can remember to go back to it
      prevBookId.current = bookId;
    }
  }, [isModalActive, isIntervalEnabled]);

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

  // --------------------------------------------------------------------------
  // Handlers
  // --------------------------------------------------------------------------

  const handleBookCardClick = (e, { id, title, imageUrl }) => {
    // Router.push(`${pathname}?id=${id}`, `${basePathname}?id=${id}`);
    Router.push(
      `${basePathnameHref}/book/[id]`,
      `${basePathnameAs}/book/${id}`,
    );

    setInitialModalSize(e.target.getBoundingClientRect());
    setInitialModalImageUrl(imageUrl);
  };

  return (
    <>
      <Header
        basePathnameHref={basePathnameHref}
        basePathnameAs={basePathnameAs}
      ></Header>

      <BookCardModal
        id={bookId}
        position={position}
        isActive={isModalActive}
        initialSize={initialModalSize}
        initialImageUrl={initialModalImageUrl}
        onClose={() => {
          Router.push(basePathnameHref, basePathnameAs);
        }}
      />

      <AboutModal
        isActive={isAboutModalActive}
        onClose={() => {
          if (prevBookId.current) {
            Router.push(
              `${basePathnameHref}/book/[id]`,
              `${basePathnameAs}/book/${prevBookId.current}`,
            );
          } else {
            Router.push(basePathnameHref);
          }
        }}
      />

      <OffTheShelfLogo isActive={isLogoActive} className={css.logo} />

      <BookShelves
        position={position}
        isActive={areShelvesActive}
        isIntervalActive={isIntervalEnabled && isShelfIntervalActive}
        booksTotal={booksTotal}
        onBookClick={handleBookCardClick}
        hasHeader={hasHeader}
      />
    </>
  );
};

export default OffTheShelfApp;
