import React from 'react';
import Head from 'next/head';

import BookCards from '../components/BookCards';
import BookCardModal from '../components/BookCardModal';

import { withApollo } from '../lib/apollo';
import useQuery from '../lib/hooks/use-query';

import css from './index.scss';

const BOOKS = /* GraphQL */ `
  query getBook($offset: Int!) {
    offTheShelf {
      books(limit: 100, offset: $offset) {
        id
        title
        sizes {
          medium {
            sourceUrl
            width
            height
          }
        }
      }
    }
  }
`;

const Home = () => {
  const [isModalActive, setIsModalActive] = React.useState(false);
  const [initialModalSize, setInitialModalSize] = React.useState();
  const [modalId, setModalId] = React.useState();

  let offset = 0;
  const { loading1, error1, data1 } = useQuery(BOOKS, {
    ssr: true,
    variables: { offset },
  });
  const books1 = data1 && data1.offTheShelf && data1.offTheShelf.books;

  offset = 100;
  const { loading2, error2, data2 } = useQuery(BOOKS, {
    ssr: true,
    variables: { offset },
  });

  const books2 = data2 && data2.offTheShelf && data2.offTheShelf.books;

  offset = 200;
  const { loading3, error3, data3 } = useQuery(BOOKS, {
    ssr: true,
    variables: { offset },
  });

  const books3 = data3 && data3.offTheShelf && data3.offTheShelf.books;

  offset = 300;
  const { loading4, error4, data4 } = useQuery(BOOKS, {
    ssr: true,
    variables: { offset },
  });

  const books4 = data4 && data4.offTheShelf && data4.offTheShelf.books;

  offset = 400;
  const { loading5, error5, data5 } = useQuery(BOOKS, {
    ssr: true,
    variables: { offset },
  });

  const books5 = data5 && data5.offTheShelf && data5.offTheShelf.books;

  offset = 500;
  const { loading6, error6, data6 } = useQuery(BOOKS, {
    ssr: true,
    variables: { offset },
  });

  const books6 = data6 && data6.offTheShelf && data6.offTheShelf.books;

  offset = 600;
  const { loading7, error7, data7 } = useQuery(BOOKS, {
    ssr: true,
    variables: { offset },
  });
  const books7 = data7 && data7.offTheShelf && data7.offTheShelf.books;

  if (error1 || error2 || error3 || error4 || error5 || error6 || error7) {
    console.log(error1);
    console.log(error2);
    console.log(error3);
    console.log(error4);
    console.log(error5);
    console.log(error6);
    console.log(error7);
    return null;
  }

  const books = [
    ...(books1 ? books1 : []),
    ...(books2 ? books2 : []),
    ...(books3 ? books3 : []),
    ...(books4 ? books4 : []),
    ...(books5 ? books5 : []),
    ...(books6 ? books6 : []),
    ...(books7 ? books7 : []),
  ];
  console.log(books);

  const loading =
    loading1 ||
    loading2 ||
    loading3 ||
    loading4 ||
    loading4 ||
    loading5 ||
    loading6 ||
    loading7;

  const handleBookCardClick = (e, id) => {
    // console.log(e, id);

    // console.log(e.target.getBoundingClientRect());

    setInitialModalSize(e.target.getBoundingClientRect());
    setModalId(id);
    setIsModalActive(true);
  };

  return (
    <>
      <Head>
        <title>Off the Shelf</title>
        <link rel="icon" href="/favicon.ico" importance="low" />
      </Head>

      <BookCardModal
        id={modalId}
        isActive={isModalActive}
        initialSize={initialModalSize}
        onClose={() => setIsModalActive(false)}
      />

      <div className={css.bookShelf}>
        {loading && 'Loading...'}

        {!loading && books && books.length > 0 && (
          <>
            <BookCards
              books={books.slice(0, 30)}
              className={css.bookCards}
              onClick={handleBookCardClick}
            ></BookCards>
            <BookCards
              books={books.slice(30, 60)}
              className={css.bookCards}
              onClick={handleBookCardClick}
            ></BookCards>
            <BookCards
              books={books.slice(60, 100)}
              className={css.bookCards}
              onClick={handleBookCardClick}
            ></BookCards>
          </>
        )}
      </div>
    </>
  );
};

export default withApollo(Home);
