import * as React from 'react';
import { render, cleanup } from '@testing-library/react';

import AboutModal from './AboutModal';

afterEach(cleanup);

describe('AboutModal', () => {
  it('renders AboutModal component', () => {
    render(<AboutModal />);
  });
});
