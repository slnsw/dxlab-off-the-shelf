import { useEffect, useState } from 'react';
import fetch from 'isomorphic-unfetch';

const useBooksData = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/off-the-shelf/data/data.json')
      .then((r) => r.json())
      .then((data) => {
        setBooks(processBooks(data));
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    console.log(`${books.length} items retrieved from data.json`);
  }, [books]);

  return { books, loading };
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
