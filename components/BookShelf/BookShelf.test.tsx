import * as React from 'react';
import { render, cleanup } from '@testing-library/react';

import BookShelf from './BookShelf';

afterEach(cleanup);

describe('BookShelf', () => {
  it('renders BookShelf component', () => {
    render(<BookShelf />);
  });
});
