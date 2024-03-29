import * as React from 'react';
import fetch from 'isomorphic-unfetch';
// import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { motion } from 'framer-motion';

import Modal from '../Modal';
import CTAButton from '../CTAButton';
import OffTheShelfLogoDivBorders from '../OffTheShelfLogoDivBorders';
import Loader from '../Loader';
import ShareBox from '../ShareBox';

import { buildHeadTitle } from '../../lib';
// import useBookData from '../../lib/hooks/use-book-data';
import { dedupeByField } from '../../lib/dedupe';

import css from './BookCardModal.module.scss';
import SocialMetaHead from '../SocialMetaHead';

type Props = {
  id: number;
  position?: 'left' | 'right' | 'test';
  isActive?: boolean;
  initialSize?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  initialImageUrl?: string;
  mode: 'gallery' | 'web';
  className?: string;
  onClose?: Function;
};

const BookCardModal: React.FunctionComponent<Props> = ({
  id,
  position = 'test',
  isActive,
  initialSize,
  initialImageUrl,
  mode,
  className,
  onClose,
}) => {
  // const {
  //   loading,
  //   error,
  //   book = {
  //     primoRecord: {},
  //     sizes: {
  //       medium: null,
  //       large: null,
  //     },
  //   },
  // } = useBookData(id);

  const [books, setBooks] = React.useState([]);
  const [book, setBook] = React.useState({
    id: 0,
    title: '',
    primoRecord: {
      id: '',
      access: '',
      accessConditions: '',
      creator: '',
      description: '',
      subjects: [],
    },
    sizes: {
      medium: null,
      large: null,
    },
  });
  const [primoRecord, setPrimoRecord] = React.useState({
    id: '',
    access: '',
    accessConditions: '',
    creator: '',
    description: '',
    subjects: [],
  });
  const [loading, setLoading] = React.useState(true);
  // const error = !id;
  React.useEffect(() => {
    fetch('/off-the-shelf/data/bookData.json')
      .then((r) => r.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  React.useEffect(() => {
    const temp = books.filter((b) => b.id === id);
    console.log('book data: ', temp[0]);
    setBook(
      temp[0] || {
        id: 0,
        title: '',
        primoRecord: {
          id: '',
          access: '',
          accessConditions: '',
          record: '',
          subjects: [],
        },
        sizes: {
          medium: null,
          large: null,
        },
      },
    );
    console.log(`${books.length} items retrieved from bookData.json`);
  }, [books]);

  React.useEffect(() => {
    setPrimoRecord(book && book.primoRecord);
  }, [book]);

  // if (error) {
  //   console.log('error:', error);
  //   return null;
  // }

  // const { primoRecord } = book;
  // const record = primoRecord || {};
  // const { creator, description } = record;

  const showExtraContent = mode === 'gallery';

  const rawImageUrl =
    (book && book.sizes && book.sizes.medium && book.sizes.medium.sourceUrl) ||
    initialImageUrl;

  // To do magic Cloudinary stuff (resize image to 1024 tall, convert to MUCH smaller 60% JPG with same background colour as site):
  // https://newselfwales.dxlab.sl.nsw.gov.au/app/uploads/sites/3/2019/10/IMG_20190812_141549-final-677x1024.png
  // becomes
  // https://res.cloudinary.com/dxlab/image/upload/h_1024,f_jpg,q_60,b_rgb:060606/off-the-shelf/2019/10/IMG_20190812_141549-final-677x1024.png

  const imageUrl =
    rawImageUrl &&
    rawImageUrl.replace(
      'https://newselfwales.dxlab.sl.nsw.gov.au/app/uploads/sites/3',
      'https://res.cloudinary.com/dxlab/image/upload/h_1024,f_jpg,q_60,b_rgb:060606/off-the-shelf',
    );
  const imageWidth =
    book && book.sizes && book.sizes.medium && book.sizes.medium.width;
  const imageHeight =
    book && book.sizes && book.sizes.medium && book.sizes.medium.height;

  const primoLink =
    primoRecord && primoRecord.id
      ? `https://search.sl.nsw.gov.au/primo-explore/fulldisplay?docid=${primoRecord.id}&vid=SLNSW`
      : null;

  if (!id) {
    return null;
  }

  return (
    <Modal
      isActive={isActive}
      initialSize={initialSize}
      className={[css.bookCardModal, className || ''].join(' ')}
      onClose={onClose}
    >
      <SocialMetaHead
        title={book && book.title}
        description={primoRecord && primoRecord.description}
        imageUrl={imageUrl}
        imageAlt={book && book.title}
        imageWidth={imageWidth}
        imageHeight={imageHeight}
        baseUrl={process.env.OFF_THE_SHELF_BASE_URL}
      />

      <Head>
        {book && book.title && (
          <title>{buildHeadTitle(book.title)}</title>

          // NOTE: Not working for client-side navigation
          // <title
          //   dangerouslySetInnerHTML={{ __html: buildHeadTitle(book.title) }}
          // ></title>
        )}
      </Head>

      <div className={css.inside}>
        {imageUrl && (
          <div className={css.imageWrapper}>
            <OffTheShelfLogoDivBorders
              orientation="topRight"
              strokeWidth={2}
              notchLength={6}
              isActive={true}
              className={css.imageBorders}
            />
            {mode === 'gallery' ? (
              <motion.img
                src={imageUrl}
                alt={book && book.title}
                className={css.image}
                animate={{ x: 0 }}
                transition={{ from: '100%', type: 'spring', damping: 15 }}
              />
            ) : (
              <img
                src={imageUrl}
                alt={book && book.title}
                className={css.image}
                // animate={{ x: 0 }}
                // transition={{ from: '100%', type: 'spring', damping: 15 }}
              />
            )}
          </div>
        )}

        <div className={css.info}>
          <div className={css.contentWrapper}>
            <OffTheShelfLogoDivBorders
              orientation="topRight"
              strokeWidth={mode === 'gallery' ? 4 : 2}
              notchLength={mode === 'gallery' ? 12 : 6}
              isActive={true}
              className={css.topBorders}
            />

            <div className={css.content}>
              <Loader
                isActive={loading}
                strokeWidth={mode === 'web' ? 2 : 4}
                className={css.loader}
              />

              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: loading ? 0 : 1,
                }}
                exit={{
                  opacity: 0,
                }}
              >
                <>
                  <h1
                    dangerouslySetInnerHTML={{ __html: book && book.title }}
                  ></h1>
                  {primoRecord && primoRecord.creator && (
                    <h2 className={css.creator}>{primoRecord.creator}</h2>
                  )}

                  {mode === 'web' && <div className={css.headingDivider}></div>}

                  {primoRecord && primoRecord.description && (
                    <p className={css.description}>{primoRecord.description}</p>
                  )}

                  <div className={css.table}>
                    {primoRecord &&
                      bookFields
                        .filter((row) => primoRecord[row.field])
                        .map((row) => {
                          const value = primoRecord[row.field];

                          return (
                            <div className={css.row} key={row.field}>
                              <div className={css.label}>
                                {(() => {
                                  switch (row.field) {
                                    case 'callNumber':
                                      return (
                                        <p>
                                          <strong>{row.label}</strong>
                                        </p>
                                      );
                                    default:
                                      return <p>{row.label}</p>;
                                  }
                                })()}
                              </div>
                              <div className={css.value}>
                                {(() => {
                                  switch (row.field) {
                                    case 'holdings':
                                      return dedupeByField(
                                        value,
                                        'subLocation',
                                      ).map((holding, i) => {
                                        return (
                                          <p
                                            key={`${holding.subLocation}-${i}`}
                                          >
                                            {holding.subLocation},{' '}
                                            {holding.status},{' '}
                                            {holding.mainLocation}
                                          </p>
                                        );
                                      });
                                    case 'subjects':
                                      return (
                                        <ul>
                                          {book &&
                                            book.primoRecord.subjects.map(
                                              (subject, i) => {
                                                return (
                                                  <li key={`${subject}-${i}`}>
                                                    {subject}
                                                  </li>
                                                );
                                              },
                                            )}
                                        </ul>
                                      );
                                    case 'callNumber':
                                      return (
                                        <p className={css.highlight}>{value}</p>
                                      );

                                    default:
                                      return <p>{value}</p>;
                                  }
                                })()}
                              </div>
                            </div>
                          );
                        })}
                    {mode === 'web' && primoLink && (
                      <div className={css.row} key={'id'}>
                        <div className={css.label}>
                          <p>More info</p>
                        </div>
                        <div className={css.value}>
                          <p>
                            <a
                              href={primoLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View catalogue record
                            </a>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {mode === 'web' && (
                    <ShareBox
                      title={book && book.title}
                      text={primoRecord && primoRecord.description}
                      baseUrl={process.env.OFF_THE_SHELF_BASE_URL}
                      fbAppId={process.env.OFF_THE_SHELF_FB_APP_ID}
                      className={css.shareBox}
                    ></ShareBox>
                  )}
                </>
              </motion.div>
            </div>
          </div>

          {showExtraContent && (
            <div className={css.extraContent}>
              <p>
                If this book piques your interest, write down the{' '}
                <strong>Call number</strong> or take a photo and ask for it in
                the reading rooms downstairs.
              </p>
              <p>
                <span>#OffTheShelf #shelfie</span>
              </p>
              <br />

              <Link
                href="/gallery/[position]/[page]"
                as={`/gallery/${position}/about`}
              >
                <CTAButton>About this exhibition</CTAButton>
              </Link>
            </div>
          )}
        </div>

        <CTAButton className={css.backButton} onClick={onClose}>
          Close
        </CTAButton>
      </div>
    </Modal>
  );
};

const bookFields = [
  {
    field: 'callNumber',
    label: 'Call number',
  },
  {
    field: 'dewey',
    label: 'Dewey',
  },
  {
    field: 'publisher',
    label: 'Publisher',
  },
  {
    field: 'access',
    label: 'Access',
  },
  {
    field: 'accessConditions',
    label: 'Access conditions',
  },
  {
    field: 'copyright',
    label: 'Copyright',
  },
  // TODO: Add this back in and dedupe
  // {
  //   field: 'creationDate',
  //   label: 'Date',
  // },
  {
    field: 'date',
    label: 'Date',
  },
  {
    field: 'language',
    label: 'Language',
  },
  {
    field: 'format',
    label: 'Format',
  },
  {
    field: 'history',
    label: 'History',
  },
  {
    field: 'isbn',
    label: 'ISBN',
  },
  {
    field: 'referenceCode',
    label: 'Reference code',
  },
  {
    field: 'holdings',
    label: 'Holdings',
  },
  {
    field: 'subjects',
    label: 'Subjects',
  },
];

export default BookCardModal;
