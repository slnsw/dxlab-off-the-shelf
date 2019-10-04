import * as React from 'react';
import { render, cleanup } from 'react-testing-library';

import BookCard from './BookCard';

afterEach(cleanup);

describe('BookCard', () => {
  it('renders BookCard component', () => {
    render(<BookCard />);
  });
});
