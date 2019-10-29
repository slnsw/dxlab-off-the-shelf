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
        {/* <OffTheShelfLogoBorders orientation="topRight" isActive={true} /> */}
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
              All books published in New South Wales and many from beyond, live
              in your State Library. Off the Shelf brings you snapshots of the
              intriguing, perplexing and playful volumes waiting to be read.
              From bodice rippers to banksia trees, cats to catafalques, turnips
              to teleology — whatever you're into, we have a book for it.
            </p>
            <p>
              If you would like to read any of these books, you can ask for them
              in the reading rooms downstairs.
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
