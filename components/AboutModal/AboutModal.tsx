import * as React from 'react';
import Head from 'next/head';

import Modal from '../Modal';
import CTAButton from '../CTAButton';
import OffTheShelfLogo from '../OffTheShelfLogo';
import OffTheShelfLogoBorders from '../OffTheShelfLogoBorders';
import OffTheShelfLogoDivBorders from '../OffTheShelfLogoDivBorders';

import { buildHeadTitle } from '../../lib';
import pkg from '../../package.json';

import css from './AboutModal.scss';
import FooterInfo from '../FooterInfo';

type Props = {
  className?: string;
  isActive?: boolean;
  mode: 'gallery' | 'web';
  onClose?: Function;
};

const AboutModal: React.FunctionComponent<Props> = ({
  className,
  isActive,
  mode = 'gallery',
  onClose,
}) => {
  const [isVersionActive, setIsVersionActive] = React.useState(false);
  const showLogo = mode === 'gallery';

  return (
    <>
      <Head>
        <link
          rel="preload"
          href="/off-the-shelf/images/SLNSW-stack.jpg"
          as="image"
        />
        {isActive && <title>{buildHeadTitle('About')}</title>}
      </Head>

      <Modal
        isActive={isActive}
        className={[css.aboutModal, className || ''].join(' ')}
        onClose={onClose}
      >
        <div className={css.info}>
          <div className={css.content}>
            {showLogo && (
              <OffTheShelfLogo
                className={css.logo}
                size={mode === 'gallery' ? 'md' : 'sm'}
              />
            )}

            {!showLogo && <h1>About</h1>}

            {!showLogo && <div className={css.headingDivider}></div>}

            <div className={css.contentInner}>
              <p>
                All books published in New South Wales, and many from beyond,
                live in your State Library. Millions of them, in a maze of
                shelves beneath your feet.
              </p>

              <p>
                <strong>Off the Shelf</strong> brings you snapshots of the
                intriguing, perplexing and playful volumes in the underground
                book stacks waiting to be read. From bodice rippers to banksia
                trees, cats to catafalques, turnips to teleology — whatever
                you're into, we have a book for it.
              </p>

              <p>
                If any of these books pique your interest, you can ask for them
                in the reading rooms downstairs. Take a photo of a book cover,
                or write down the call number, and ask a librarian to see it off
                the shelf in:
              </p>

              <ul>
                <li>
                  <strong>Bashir Reading Room</strong>, Lower Ground 1,
                  Macquarie Building
                </li>
                <li>
                  <strong>Mitchell Reading Room</strong>, Ground Floor, Mitchell
                  Building
                </li>
              </ul>
            </div>
          </div>

          <div className={css.imageWrapper}>
            <img
              src={'/off-the-shelf/images/SLNSW-stack.jpg'}
              alt="Mitchell library stack, by Merinda Campbell"
              className={css.image}
            />

            {mode === 'web' && (
              <OffTheShelfLogoDivBorders
                orientation="topRight"
                isActive={true}
                strokeWidth={2}
                notchLength={6}
                className={css.imageBorders}
              ></OffTheShelfLogoDivBorders>
            )}
          </div>

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

          <div className={css.extraContent}>
            <p className={css.large}>
              <span>#OffTheShelf #shelfie</span>
            </p>
            <p>
              Please email{' '}
              {mode === 'web' ? (
                <a href="mailto:media@sl.nsw.gov.au">media@sl.nsw.gov.au</a>
              ) : (
                <span>media@sl.nsw.gov.au</span>
              )}{' '}
              for enquiries.
            </p>

            {mode === 'web' && <FooterInfo></FooterInfo>}
          </div>
        </div>

        <div
          className={css.version}
          style={{
            opacity: isVersionActive ? 1 : 0,
          }}
          onClick={() => {
            console.log(isVersionActive);

            setIsVersionActive(!isVersionActive);
          }}
        >
          {pkg.version}
        </div>
      </Modal>
    </>
  );
};

export default AboutModal;
