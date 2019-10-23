import * as React from 'react';
import { render, cleanup } from '@testing-library/react';

import OffTheShelfLogoText from './OffTheShelfLogoText';

afterEach(cleanup);

describe('OffTheShelfLogoText', () => {
  it('renders OffTheShelfLogoText component', () => {
    render(<OffTheShelfLogoText />);
  });
});
