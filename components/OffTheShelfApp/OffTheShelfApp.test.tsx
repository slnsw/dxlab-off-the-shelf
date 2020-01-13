import * as React from 'react';
import { render, cleanup } from '@testing-library/react';

import OffTheShelfApp from './OffTheShelfApp';

afterEach(cleanup);

describe('OffTheShelfApp', () => {
  it('renders OffTheShelfApp component', () => {
    render(<OffTheShelfApp />);
  });
});
