import * as React from 'react';
import { render, cleanup} from '@testing-library/react';

import BookSpines from './BookSpines';

afterEach(cleanup);

describe('BookSpines', () => {
  it('renders BookSpines component', () => {
    render(<BookSpines/>);
  });
});
