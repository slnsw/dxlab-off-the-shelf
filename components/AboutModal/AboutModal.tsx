import * as React from 'react';

import Modal from '../Modal';
import CTAButton from '../CTAButton';
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
      className={[css.bookCardModal, className || ''].join(' ')}
      onClose={onClose}
    >
      <img
        src={'/images/SLNSW-stack.jpg'}
        alt={'SLNSW Stack'}
        className={css.image}
      />
      <div className={css.info}>
        <OffTheShelfLogoBorders orientation="topRight" />
        <div className={css.content}>
          <>
            <h1>About Off The Shelf</h1>

            <div className={css.table}>
              <p>
                Did you know the State Library of NSW has five floors underneath
                the reading rooms where the collection is kept? This is called
                the Stacks. The book covers that you are seeing are kept on
                these floors.
              </p>
              <p>
                All books published in New South Wales and many from beyond,
                live in your State Library. Off the Shelf brings you snapshots
                of the intriguing, perplexing and playful volumes waiting to be
                read. From bodice rippers to banksia trees, cats to catafalques,
                turnips to teleology — whatever you're into, we have a book for
                it.
              </p>
              <p>
                If you would like to read any of these books, you can ask for
                them in the reading rooms downstairs.
              </p>
              <p>#OffTheShelf #shelfie</p>
              <p>Please email media@sl.nsw.gov.au for enquiries.</p>
            </div>
          </>
        </div>{' '}
        <CTAButton className={css.backButton} onClick={onClose}>
          Close
        </CTAButton>
      </div>
    </Modal>
  );
};

export default AboutModal;
