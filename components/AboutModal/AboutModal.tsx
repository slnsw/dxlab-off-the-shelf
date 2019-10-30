import * as React from 'react';

import Modal from '../Modal';
import CTAButton from '../CTAButton';
import OffTheShelfLogo from '../OffTheShelfLogo';
import OffTheShelfLogoBorders from '../OffTheShelfLogoBorders';

import css from './AboutModal.scss';

type Props = {
  className?: string;
  isActive?: boolean;
  onClose?: Function;
};

const AboutModal: React.FunctionComponent<Props> = ({
  className,
  isActive,
  onClose,
}) => {
  return (
    <Modal
      isActive={isActive}
      className={[css.aboutModal, className || ''].join(' ')}
      onClose={onClose}
    >
      <div className={css.info}>
        <div className={css.content}>
          <>
            {/* <h1>About Off The Shelf</h1> */}
            <OffTheShelfLogo className={css.logo} />

            <p>
              Did you know the State Library of NSW has five floors underneath
              the reading rooms where the collection is kept? This is called the
              Stacks. The book covers that you are seeing are kept on these
              floors.
            </p>

            <p>
              Off the Shelf brings you snapshots of the intriguing, perplexing
              and playful volumes waiting to be read. From bodice rippers to
              banksia trees, cats to catafalques, turnips to teleology —
              whatever you're into, we have a book for it.
            </p>
            <p>
              If you would like to read any of these books, you can ask for them
              in the reading room downstairs.
            </p>

            <h2>FAQ’s</h2>

            <h3>How do I request my book?</h3>
            <p>
              You can take a photo of the screen showing the book that you want
              to read or write down the call number and take that to the
              Governor Marie Bashir Reading Room.
            </p>

            <h3>Where is the Reading room?</h3>
            <p>
              The Governor Marie Bashir Reading Room is located in the Macquarie
              Street building. Go to the lower ground level and the staff at the
              information desk will guide you on how to request your book
            </p>
            <h3>How long will it take to get my book?</h3>
            <p>
              There are a lot of floors and many books in the stacks so it can
              take our staff up to 30 minutes to get your book. Browse in the
              Critics Picks area of interest for you while you wait (there are
              six to choose from).
            </p>

            <h3>Can I borrow this book?</h3>
            <p>
              You will be able to read this book in the Library as we are not a
              lending Library, however, you can ask your local library if an
              interlibrary loan is possible.
            </p>

            <p>
              <span>#OffTheShelf #shelfie</span>
            </p>
            <p>
              Please email <span>media@sl.nsw.gov.au</span> for enquiries.
            </p>
          </>
        </div>
        <img
          src={'/images/SLNSW-stack.jpg'}
          alt={'SLNSW Stack'}
          className={css.image}
        />
        <CTAButton className={css.backButton} onClick={onClose}>
          Close
        </CTAButton>

        <OffTheShelfLogoBorders
          className={css.borders}
          strokeWidth={32}
          orientation={'topRight'}
          delay={1}
          isActive={true}
        />
      </div>
    </Modal>
  );
};

export default AboutModal;
