import * as React from 'react';

import Modal from '../Modal';

import useQuery from '../../lib/hooks/use-query';

import css from './BookCardModal.scss';

const BOOK = `
  query getBook($id: Int!) {
    offTheShelf {
      book(id: $id) {
        title
        sizes {
          large {
            sourceUrl
          }
        }
      }
    }
  }
`;

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

const BookCardModalWrapper: React.FunctionComponent<Props> = (props) => {
  if (!props.id) {
    return null;
  }

  return <BookCardModal {...props} />;
};

const BookCardModal: React.FunctionComponent<Props> = ({
  id,
  isActive,
  initialSize,
  className,
  onClose,
}) => {
  const { loading, error, data } = useQuery(BOOK, {
    variables: {
      id,
    },
  });

  if (error) {
    console.log(error);

    return null;
  }

  const book = (data && data.offTheShelf && data.offTheShelf.book) || {};

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
          <img
            src={book.sizes.large.sourceUrl}
            alt={book.title}
            className={css.image}
          />{' '}
          {book.title}
        </>
      )}
    </Modal>
  );
};

export default BookCardModalWrapper;
