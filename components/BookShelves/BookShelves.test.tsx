import * as React from 'react';
import { render, cleanup} from '@testing-library/react';

import BookShelves from './BookShelves';

afterEach(cleanup);

describe('BookShelves', () => {
  it('renders BookShelves component', () => {
    render(<BookShelves/>);
  });
});
