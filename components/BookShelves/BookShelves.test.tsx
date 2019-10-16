import * as React from 'react';
import { render, cleanup } from '@testing-library/react';
import { ApolloProvider } from '@apollo/react-hooks';

import BookShelves from './BookShelves';

import { initApolloClient } from '../../lib/apollo';

const client = initApolloClient({});

afterEach(cleanup);

describe('BookCardModal', () => {
  it('renders BookCardModal component', () => {
    render(
      <ApolloProvider client={client}>
        <BookShelves />
      </ApolloProvider>,
    );
  });
});
