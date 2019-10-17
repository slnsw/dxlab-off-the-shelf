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
            <OffTheShelfLogoBorders />

            <div className={css.content}>
              <h1 dangerouslySetInnerHTML={{ __html: book.title }}></h1>

              {book.primoRecord && (
                <>
                  {book.primoRecord.creator && (
                    <p>Author: {book.primoRecord.creator}</p>
                  )}
                  {book.primoRecord.publisher && (
                    <p>Publisher: {book.primoRecord.publisher}</p>
                  )}
                  {book.primoRecord.access && <p>{book.primoRecord.access}</p>}
                  {book.primoRecord.accessConditions && (
                    <p>Access: {book.primoRecord.accessConditions}</p>
                  )}
                  {book.primoRecord.callNumber && (
                    <p>Call number: {book.primoRecord.callNumber}</p>
                  )}
                  {book.primoRecord.copyright && (
                    <p>Copyright: {book.primoRecord.copyright}</p>
                  )}
                  {book.primoRecord.creationDate && (
                    <p>Date: {book.primoRecord.creationDate}</p>
                  )}
                  {!book.primoRecord.creationDate && book.primoRecord.date && (
                    <p>Date: {book.primoRecord.date}</p>
                  )}
                  {book.primoRecord.description && (
                    <p>{book.primoRecord.description}</p>
                  )}
                  {book.primoRecord.dewey && (
                    <p>Dewey: {book.primoRecord.dewey}</p>
                  )}
                  {book.primoRecord.exhibitions && (
                    <p>{book.primoRecord.exhibitions}</p>
                  )}
                  {book.primoRecord.format && (
                    <p>Format: {book.primoRecord.format}</p>
                  )}
                  {book.primoRecord.history && (
                    <p>History: {book.primoRecord.history}</p>
                  )}
                  {book.primoRecord.holdings &&
                    book.primoRecord.holdings.map((holding) => {
                      return (
                        <p key={holding.subLocation}>
                          {holding.subLocation}, {holding.status},{' '}
                          {holding.mainLocation}
                        </p>
                      );
                    })}
                  {/* {book.primoRecord.id && <p>ID: {book.primoRecord.id}</p>} */}
                  {book.primoRecord.isbn && (
                    <p>ISBN: {book.primoRecord.isbn}</p>
                  )}
                  {book.primoRecord.language && (
                    <p>Language: {book.primoRecord.language}</p>
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

                  {book.primoRecord.referenceCode && (
                    <p>Reference code: {book.primoRecord.referenceCode}</p>
                  )}
                  {book.primoRecord.source && (
                    <p>Source: {book.primoRecord.source}</p>
                  )}
                  {book.primoRecord.subjects && (
                    <>
                      <p>Subjects:</p>
                      <ul>
                        {book.primoRecord.subjects.map((subject) => {
                          return <li key={subject}>{subject}</li>;
                        })}
                      </ul>
                    </>
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
