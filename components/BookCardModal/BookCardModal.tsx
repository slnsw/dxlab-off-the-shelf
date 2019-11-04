import * as React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { motion } from 'framer-motion';

import Modal from '../Modal';
import CTAButton from '../CTAButton';
import OffTheShelfLogoBorders from '../OffTheShelfLogoBorders';
import Loader from '../Loader';

import { buildHeadTitle } from '../../lib';
import useBookData from '../../lib/hooks/use-book-data';

import css from './BookCardModal.scss';

type Props = {
  id: number;
  // position?: 'left' | 'right';
  isActive?: boolean;
  initialSize?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  initialImageUrl?: string;
  className?: string;
  onClose?: Function;
};

const BookCardModal: React.FunctionComponent<Props> = ({
  id,
  // TODO: Make this nicer
  // position = 'left',
  isActive,
  initialSize,
  initialImageUrl,
  className,
  onClose,
}) => {
  const {
    loading,
    error,
    book = {
      primoRecord: {},
      sizes: {
        medium: null,
        large: null,
      },
    },
  } = useBookData(id);

  const { pathname, asPath } = useRouter();

  // console.log(pathname, asPath);

  if (error) {
    console.log(error);

    return null;
  }

  const { primoRecord } = book;
  const record = primoRecord || {};
  const { creator, description } = record;

  const imageUrl =
    (book.sizes.medium && book.sizes.medium.sourceUrl) || initialImageUrl;

  return (
    <Modal
      isActive={isActive}
      initialSize={initialSize}
      className={[css.bookCardModal, className || ''].join(' ')}
      onClose={onClose}
    >
      <Head>{book.title && <title>{buildHeadTitle(book.title)}</title>}</Head>

      {imageUrl && (
        <div className={css.imageWrapper}>
          <motion.img
            src={imageUrl}
            alt={book.title}
            className={css.image}
            animate={{ x: 0 }}
            transition={{ from: '100%', type: 'spring', damping: 15 }}
          />
        </div>
      )}

      <div className={css.info}>
        <div className={css.contentWrapper}>
          <OffTheShelfLogoBorders
            orientation="topRight"
            strokeWidth={8}
            isActive={true}
            className={css.topBorders}
          />

          <div className={css.content}>
            <Loader isActive={loading} className={css.loader} />

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
                <h1 dangerouslySetInnerHTML={{ __html: book.title }}></h1>
                {creator && <h2>{creator}</h2>}

                {description && (
                  <p className={css.description}>{description}</p>
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
                                    return value.map((holding, i) => {
                                      return (
                                        <p key={`${holding.subLocation}-${i}`}>
                                          {holding.subLocation},{' '}
                                          {holding.status},{' '}
                                          {holding.mainLocation}
                                        </p>
                                      );
                                    });
                                  case 'subjects':
                                    return (
                                      <ul>
                                        {book.primoRecord.subjects.map(
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
                </div>

                {/* {book.primoRecord.exhibitions && (
                  <p>{book.primoRecord.exhibitions}</p>
                )}
                {book.primoRecord.notes && (
                  <p>Notes: {book.primoRecord.notes}</p>
                )}
                {book.primoRecord.personNames && (
                  <p>Names: {book.primoRecord.personNames}</p>
                )}
                {book.primoRecord.physicalDescription && (
                  <p>{book.primoRecord.physicalDescription}</p>
                )}
                {book.primoRecord.source && (
                  <p>Source: {book.primoRecord.source}</p>
                )}
                {book.primoRecord.topics && (
                  <p>Topics: {book.primoRecord.topics}</p>
                )} */}
              </>
            </motion.div>
          </div>
        </div>

        <div className={css.extraContent}>
          <p>
            If this book piques your interest, write down the{' '}
            <strong>Call number</strong> or take a photo and ask for it in the
            reading rooms downstairs.
          </p>
          <p>
            <span>#OffTheShelf #shelfie</span>
          </p>
          <br />

          <Link
            href={`${pathname}?id=${id}&page=about`}
            as={`${asPath}&page=about`}
          >
            <CTAButton>About this exhibition</CTAButton>
          </Link>
        </div>
      </div>

      <CTAButton className={css.backButton} onClick={onClose}>
        Close
      </CTAButton>
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
