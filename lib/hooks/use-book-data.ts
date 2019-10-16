import useQuery from './use-query';

const BOOK = /* GraphQL */ `
  query getBook($id: Int!) {
    offTheShelf {
      book(id: $id) {
        title
        sizes {
          large {
            sourceUrl
            width
            height
          }
        }
        primoRecord {
          id
          callNumber
          referenceCode
          date
          format
          type
          creator
          description
          subjects
          topics
          creationDate
          isbn
          dewey
          publisher
          language
          notes
          access
          exhibitions
          physicalDescription
          accessConditions
          history
          source
          copyright
          personNames
          holdings {
            mainLocation
            status
            subLocation
          }
        }
      }
      bookTotal
    }
  }
`;

const useBookData = (id: number) => {
  const { loading, error, data } = useQuery(BOOK, {
    ssr: true,
    variables: {
      // Dodgey hard coding of id as GraphQL needs one, if for skip to work.
      id,
      // id: hasId ? id : 900,
      // skip: !hasId,
    },
  });
  const book = data && data.offTheShelf && data.offTheShelf.book;

  // if (error) {
  //   console.log(error);
  //   return null;
  // }

  return { loading, error, book };
};
export default useBookData;
