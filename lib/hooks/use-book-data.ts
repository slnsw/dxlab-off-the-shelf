import useQuery from './use-query';

const BOOK = /* GraphQL */ `
  query getBook($id: Int, $skip: Boolean!) {
    offTheShelf {
      book(id: $id) @skip(if: $skip) {
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
    }
  }
`;

const useBookData = (id: number) => {
  const hasId = Boolean(id);

  const { loading, error, data } = useQuery(BOOK, {
    ssr: true,
    variables: {
      // id,
      id: hasId ? id : null,
      skip: !hasId,
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
