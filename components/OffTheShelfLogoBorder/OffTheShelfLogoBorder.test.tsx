import * as React from 'react';
import { render, cleanup } from '@testing-library/react';

import OffTheShelfLogoBorder from './OffTheShelfLogoBorder';

afterEach(cleanup);

describe('OffTheShelfLogoBorder', () => {
  it('renders OffTheShelfLogoBorder component', () => {
    render(<OffTheShelfLogoBorder />);
  });
});
