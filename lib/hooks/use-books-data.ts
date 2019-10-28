import useQuery from './use-query';

const BOOKS = /* GraphQL */ `
  query getBooks($offset: Int!) {
    offTheShelf {
      books(limit: 100, offset: $offset) {
        id
        title
        sizes {
          thumbnail {
            sourceUrl
            width
            height
          }
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

const useBooksData = () => {
  let offset = 0;
  const { loading: loading1, error: error1, data: data1 } = useQuery(BOOKS, {
    ssr: true,
    variables: { offset },
  });
  const books1 = data1 && data1.offTheShelf && data1.offTheShelf.books;

  offset = 100;
  const { loading: loading2, error: error2, data: data2 } = useQuery(BOOKS, {
    ssr: true,
    variables: { offset },
  });

  const books2 = data2 && data2.offTheShelf && data2.offTheShelf.books;

  offset = 200;
  const { loading: loading3, error: error3, data: data3 } = useQuery(BOOKS, {
    ssr: true,
    variables: { offset },
  });

  const books3 = data3 && data3.offTheShelf && data3.offTheShelf.books;

  offset = 300;
  const { loading: loading4, error: error4, data: data4 } = useQuery(BOOKS, {
    ssr: true,
    variables: { offset },
  });

  const books4 = data4 && data4.offTheShelf && data4.offTheShelf.books;

  offset = 400;
  const { loading: loading5, error: error5, data: data5 } = useQuery(BOOKS, {
    ssr: true,
    variables: { offset },
  });

  const books5 = data5 && data5.offTheShelf && data5.offTheShelf.books;

  offset = 500;
  const { loading: loading6, error: error6, data: data6 } = useQuery(BOOKS, {
    ssr: true,
    variables: { offset },
  });

  const books6 = data6 && data6.offTheShelf && data6.offTheShelf.books;

  offset = 600;
  const { loading: loading7, error: error7, data: data7 } = useQuery(BOOKS, {
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
    ...(books1 || []),
    ...(books2 || []),
    ...(books3 || []),
    ...(books4 || []),
    ...(books5 || []),
    ...(books6 || []),
    ...(books7 || []),
  ];

  const loading =
    loading1 ||
    loading2 ||
    loading3 ||
    loading4 ||
    loading4 ||
    loading5 ||
    loading6 ||
    loading7;

  return { books: processBooks(books), loading };
};

// Filter out books that don't have an image
function processBooks(books) {
  return books.filter((book) => {
    return (
      book &&
      book.sizes &&
      book.sizes.medium &&
      book.sizes.medium.sourceUrl &&
      book.sizes.medium.sourceUrl !== 'Hello World'
    );
  });
}

export default useBooksData;
