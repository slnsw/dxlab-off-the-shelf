import * as React from 'react';
import { render, cleanup } from '@testing-library/react';

import Button from './Button';

afterEach(cleanup);

describe('Button', () => {
  it('renders Button component', () => {
    render(<Button />);
  });
});
