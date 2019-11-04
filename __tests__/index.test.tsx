import * as React from 'react';
import { render } from '@testing-library/react';

import GalleryPage from '../pages/gallery';

describe('Home Page', () => {
  it('Home Page rendered', () => {
    render(<GalleryPage />);
  });
});
