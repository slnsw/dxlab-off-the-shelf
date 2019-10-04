import * as React from 'react';
import { render, cleanup } from '@testing-library/react';

import BookCardModal from './BookCardModal';

afterEach(cleanup);

describe('BookCardModal', () => {
  it('renders BookCardModal component', () => {
    render(<BookCardModal />);
  });
});
