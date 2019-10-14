import * as React from 'react';
import { render, cleanup} from '@testing-library/react';

import BookSpine from './BookSpine';

afterEach(cleanup);

describe('BookSpine', () => {
  it('renders BookSpine component', () => {
    render(<BookSpine/>);
  });
});
