import * as React from 'react';
import { render, cleanup } from '@testing-library/react';

import BookCard from './BookCard';

afterEach(cleanup);

describe('BookCard', () => {
  it('renders BookCard component', () => {
    render(<BookCard />);
  });
});
