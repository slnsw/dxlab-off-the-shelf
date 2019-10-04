import * as React from 'react';
import { render, cleanup } from '@testing-library/react';

import Modal from './Modal';

afterEach(cleanup);

describe('Modal', () => {
  it('renders Modal component', () => {
    render(<Modal />);
  });
});
