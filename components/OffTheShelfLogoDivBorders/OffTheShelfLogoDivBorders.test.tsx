import * as React from 'react';
import { render, cleanup } from '@testing-library/react';

import OffTheShelfLogoDivBorders from './OffTheShelfLogoDivBorders';

afterEach(cleanup);

describe('OffTheShelfLogoDivBorders', () => {
  it('renders OffTheShelfLogoDivBorders component', () => {
    render(<OffTheShelfLogoDivBorders />);
  });
});
