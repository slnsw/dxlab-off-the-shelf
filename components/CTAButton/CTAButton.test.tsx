import * as React from 'react';
import { render, cleanup } from '@testing-library/react';

import CTAButton from './CTAButton';

afterEach(cleanup);

describe('CTAButton', () => {
  it('renders CTAButton component', () => {
    render(<CTAButton />);
  });
});
