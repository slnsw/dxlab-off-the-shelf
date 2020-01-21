import * as React from 'react';
import { render, cleanup } from '@testing-library/react';

import ShareBox from './ShareBox';

afterEach(cleanup);

describe('ShareBox', () => {
  it('renders ShareBox component', () => {
    render(<ShareBox />);
  });
});
