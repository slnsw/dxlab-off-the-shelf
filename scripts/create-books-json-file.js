/* eslint-disable */

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
      uri: process.env.OFF_THE_SHELF_GRAPHQL_URL,
      credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
      fetch,
    }),
    cache: new InMemoryCache().restore(initialState),
  });
}

const client = initApolloClient();

const BOOK = /* GraphQL */ gql`
  query getBook($id: Int) {
    offTheShelf {
      book(id: $id) {
        id
        title
        sizes {
          medium {
            sourceUrl
            width
            height
          }
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
const errIds = [];
const getBookData = async (id) => {
  // const hasId = Boolean(id);
  try {
    const result = await client.query({
      query: BOOK,
      variables: {
        id,
      },
    });

    return result;
  } catch (e) {
    console.log(e);
    // console.log('id', id);
    errIds.push(id);
    return null;
  }
};

const createBooksJsonFile = async () => {
  let ids = [];
  let output = [];
  try {
    const data = fs.readFileSync(
      __dirname + '/../public/off-the-shelf/data/data.json',
      'utf8',
    );

    ids = JSON.parse(data).map((i) => {
      return i.id;
    });
  } catch (err) {
    console.error(err);
  }

  for (let x = 0; x < ids.length; x++) {
    // ids.map(async (id) => {
    let id = ids[x];
    console.log(id);
    // if (id) {
    const bookResposnse = await getBookData(id);
    const book =
      bookResposnse &&
      bookResposnse.data.offTheShelf &&
      bookResposnse.data.offTheShelf.book;
    output.push(book);
    // if (id == 1289) {
    // console.log(output);
    // }
  }
  // });
  // console.log(output.length);

  fs.writeFile(
    __dirname + '/../public/off-the-shelf/data/bookData.json',
    JSON.stringify(output),
    function(err) {
      if (err) {
        return console.log(err);
      }
      console.log(`The file was saved with ${output.length} items`);
    },
  );
};

createBooksJsonFile();
