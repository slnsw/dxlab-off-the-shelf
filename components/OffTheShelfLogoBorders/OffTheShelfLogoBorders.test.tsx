import * as React from 'react';
import { render, cleanup } from '@testing-library/react';

import OffTheShelfLogoBorders from './OffTheShelfLogoBorders';

afterEach(cleanup);

describe('OffTheShelfLogoBorders', () => {
  it('renders OffTheShelfLogoBorders component', () => {
    render(<OffTheShelfLogoBorders />);
  });
});
