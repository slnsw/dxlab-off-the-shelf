import * as React from 'react';
import { render, cleanup } from '@testing-library/react';

import OffTheShelfLogoBordersNew from './OffTheShelfLogoBordersNew';

afterEach(cleanup);

describe('OffTheShelfLogoBordersNew', () => {
  it('renders OffTheShelfLogoBordersNew component', () => {
    render(<OffTheShelfLogoBordersNew />);
  });
});
