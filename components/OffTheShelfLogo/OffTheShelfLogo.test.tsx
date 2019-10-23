import * as React from 'react';
import { render, cleanup } from '@testing-library/react';

import OffTheShelfLogo from './OffTheShelfLogo';

afterEach(cleanup);

describe('OffTheShelfLogo', () => {
  it('renders OffTheShelfLogo component', () => {
    render(<OffTheShelfLogo />);
  });
});
