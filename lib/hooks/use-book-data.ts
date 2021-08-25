import { useEffect, useState } from 'react';
import fetch from 'isomorphic-unfetch';
// import useQuery from './use-query';

// const BOOK = /* GraphQL */ `
//   query getBook($id: Int, $skip: Boolean!) {
//     offTheShelf {
//       book(id: $id) @skip(if: $skip) {
//         title
//         sizes {
//           medium {
//             sourceUrl
//             width
//             height
//           }
//           large {
//             sourceUrl
//             width
//             height
//           }
//         }
//         primoRecord {
//           id
//           callNumber
//           referenceCode
//           date
//           format
//           type
//           creator
//           description
//           subjects
//           topics
//           creationDate
//           isbn
//           dewey
//           publisher
//           language
//           notes
//           access
//           exhibitions
//           physicalDescription
//           accessConditions
//           history
//           source
//           copyright
//           personNames
//           holdings {
//             mainLocation
//             status
//             subLocation
//           }
//         }
//       }
//     }
//   }
// `;

// const useBookData = (id: number) => {
//   const hasId = Boolean(id);

//   const { loading, error, data } = useQuery(BOOK, {
//     ssr: true,
//     variables: {
//       // id,
//       id: hasId ? id : null,
//       skip: !hasId,
//     },
//   });
//   const book = data && data.offTheShelf && data.offTheShelf.book;

//   // if (error) {
//   //   console.log(error);
//   //   return null;
//   // }
//   // console.log(book);
//   return {
//     loading,
//     error,
//     book,
//   };
// };

const useBookData = (id: number) => {
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(true);
  const error = !id;
  useEffect(() => {
    fetch('/off-the-shelf/data/bookData.json')
      .then((r) => r.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const temp = books.filter((b) => b.id === id);
    console.log('book data: ', temp[0]);
    setBook(temp[0]);
    console.log(`${books.length} items retrieved from bookData.json`);
  }, [books]);

  return { book, error, loading };
};

export default useBookData;
