import * as React from 'react';
import { render, cleanup } from '@testing-library/react';

import BookCards from './BookCards';

afterEach(cleanup);

describe('BookCards', () => {
  it('renders BookCards component', () => {
    render(<BookCards />);
  });
});
