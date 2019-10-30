import * as React from 'react';
// import Router from 'next/router';
import Link from 'next/link';

import Modal from '../Modal';
import CTAButton from '../CTAButton';
import OffTheShelfLogoBorders from '../OffTheShelfLogoBorders';
import Loader from '../Loader';

import useBookData from '../../lib/hooks/use-book-data';

import css from './BookCardModal.scss';

type Props = {
  id: number;
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
      {imageUrl && (
        <img src={imageUrl} alt={book.title} className={css.image} />
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
            {loading ? (
              // ? 'Loading...'
              <Loader isActive={true} strokeWidth={16} delay={100} />
            ) : (
              primoRecord && (
                <>
                  <h1 dangerouslySetInnerHTML={{ __html: book.title }}></h1>
                  {creator && <h2>{creator}</h2>}

                  {description && (
                    <p className={css.description}>{description}</p>
                  )}

                  <div className={css.table}>
                    {[
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
                    ]
                      .filter((row) => primoRecord[row.field])
                      .map((row) => {
                        return (
                          <div className={css.row}>
                            <div className={css.label}>
                              <p>{row.label}</p>
                            </div>
                            <div className={css.value}>
                              {(() => {
                                switch (row.field) {
                                  case 'holdings':
                                    return primoRecord[row.field].map(
                                      (holding, i) => {
                                        return (
                                          <p
                                            key={`${holding.subLocation}-${i}`}
                                          >
                                            {holding.subLocation},{' '}
                                            {holding.status},{' '}
                                            {holding.mainLocation}
                                          </p>
                                        );
                                      },
                                    );
                                  case 'subjects':
                                    return (
                                      <ul>
                                        {book.primoRecord.subjects.map(
                                          (subject) => {
                                            return (
                                              <li key={subject}>{subject}</li>
                                            );
                                          },
                                        )}
                                      </ul>
                                    );
                                  default:
                                    return <p>{primoRecord[row.field]}</p>;
                                }
                              })()}
                            </div>
                          </div>
                        );
                      })}
                  </div>

                  {book.primoRecord.exhibitions && (
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
                  )}
                </>
              )
            )}
          </div>

          {/* <OffTheShelfLogoBorders
            orientation="bottomLeft"
            strokeWidth={8}
            isActive={true}
            hasStartCorners={false}
            hasEndCorners={false}
            delay={1.8}
            className={css.bottomBorders}
          /> */}
        </div>

        <div className={css.extraContent}>
          <p>
            If this book piques your interest, you can ask for it in the reading
            rooms downstairs.
          </p>
          <p>
            <span>#OffTheShelf #shelfie</span>
          </p>
          <br />

          <Link href={`/?id=${id}&page=about`}>
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

export default BookCardModal;
