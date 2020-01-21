import * as React from 'react';
import { render, cleanup } from '@testing-library/react';

import FooterInfo from './FooterInfo';

afterEach(cleanup);

describe('FooterInfo', () => {
  it('renders FooterInfo component', () => {
    render(<FooterInfo />);
  });
});
