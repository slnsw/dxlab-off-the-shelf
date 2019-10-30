import * as React from 'react';
import { render, cleanup} from '@testing-library/react';

import Loader from './Loader';

afterEach(cleanup);

describe('Loader', () => {
  it('renders Loader component', () => {
    render(<Loader/>);
  });
});
