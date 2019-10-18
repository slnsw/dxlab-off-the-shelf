import * as React from 'react';

import Modal from '../Modal';
import OffTheShelfLogoBorders from '../OffTheShelfLogoBorders';

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
  className?: string;
  onClose?: Function;
};

const BookCardModal: React.FunctionComponent<Props> = ({
  id,
  isActive,
  initialSize,
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
  const { creator, description } = primoRecord;

  return (
    <Modal
      isActive={isActive}
      initialSize={initialSize}
      className={[css.bookCardModal, className || ''].join(' ')}
      onClose={onClose}
    >
      {loading ? (
        'Loading...'
      ) : (
        <>
          {book.sizes.medium && (
            <img
              src={book.sizes.medium.sourceUrl}
              alt={book.title}
              className={css.image}
            />
          )}

          <div className={css.info}>
            <OffTheShelfLogoBorders orientation="topRight" />

            <div className={css.content}>
              <h1 dangerouslySetInnerHTML={{ __html: book.title }}></h1>

              {primoRecord && (
                <>
                  {creator && <h2>{creator}</h2>}

                  {description && (
                    <p className={css.description}>{description}</p>
                  )}

                  <div className={css.table}>
                    {[
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
                        field: 'callNumber',
                        label: 'Call number',
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
                        field: 'dewey',
                        label: 'Dewey',
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
                                      (holding) => {
                                        return (
                                          <p key={holding.subLocation}>
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
              )}
            </div>
          </div>
        </>
      )}
    </Modal>
  );
};

export default BookCardModal;
