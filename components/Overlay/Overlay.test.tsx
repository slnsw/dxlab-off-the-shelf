import * as React from 'react';
import { render, cleanup } from '@testing-library/react';

import Overlay from './Overlay';

afterEach(cleanup);

describe('Overlay', () => {
  it('renders Overlay component', () => {
    render(<Overlay />);
  });
});
