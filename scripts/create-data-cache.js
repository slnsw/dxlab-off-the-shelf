/* eslint-disable */
// https://github.com/zeit/next.js/blob/v9.0.7/examples/with-apollo/lib/apollo.js

const { ApolloClient } = require('apollo-client');
const { InMemoryCache } = require('apollo-cache-inmemory');
const { HttpLink } = require('apollo-link-http');
const { fetch } = require('isomorphic-unfetch');
const gql = require('graphql-tag');
const fs = require('fs');

require('dotenv').config();

let apolloClient = null;

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param  {Object} initialState
 */
function initApolloClient(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return createApolloClient(initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = createApolloClient(initialState);
  }

  return apolloClient;
}

/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 */
function createApolloClient(initialState = {}) {
  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    ssrMode: typeof window === 'undefined', // Disables forceFetch on the server (so queries are only run once)
    link: new HttpLink({
      // uri: 'https://dxlab-graphql.now.sh/graphql',
      uri: process.env.GRAPHQL_URL,
      credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
      fetch,
    }),
    cache: new InMemoryCache().restore(initialState),
  });
}

const client = initApolloClient();

const BOOKS = /* GraphQL */ gql`
  query getBooks($limit: Int!, $offset: Int!) {
    offTheShelf {
      books(limit: $limit, offset: $offset) {
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

const getData = async (limit, offset) => {
  try {
    const result = await client.query({
      query: BOOKS,
      variables: {
        limit: limit,
        offset: offset,
      },
    });

    return result;
  } catch (e) {
    console.log(e);

    return null;
  }
};

const createDataCache = async () => {
  let offset = 0;
  const data1 = await getData(100, offset);
  const books1 =
    data1 && data1.data.offTheShelf && data1.data.offTheShelf.books;

  offset = 100;
  const data2 = await getData(100, offset);
  const books2 =
    data2 && data2.data.offTheShelf && data2.data.offTheShelf.books;

  offset = 200;
  const data3 = await getData(100, offset);
  const books3 =
    data3 && data3.data.offTheShelf && data3.data.offTheShelf.books;

  offset = 300;
  const data4 = await getData(100, offset);
  const books4 =
    data4 && data4.data.offTheShelf && data4.data.offTheShelf.books;

  offset = 400;
  const data5 = await getData(100, offset);
  const books5 =
    data5 && data5.data.offTheShelf && data5.data.offTheShelf.books;

  offset = 500;
  const data6 = await getData(100, offset);
  const books6 =
    data6 && data6.data.offTheShelf && data6.data.offTheShelf.books;

  offset = 600;
  const data7 = await getData(100, offset);
  const books7 =
    data7 && data7.data.offTheShelf && data7.data.offTheShelf.books;

  const books = [
    ...(books1 || []),
    ...(books2 || []),
    ...(books3 || []),
    ...(books4 || []),
    ...(books5 || []),
    ...(books6 || []),
    ...(books7 || []),
  ];

  fs.writeFile(
    __dirname + '/../public/off-the-shelf/data/data.json',
    JSON.stringify(books),
    function(err) {
      if (err) {
        return console.log(err);
      }
      console.log(`The file was saved with ${books.length} items`);
    },
  );
};

createDataCache();
