import React from 'react';

import GalleryPage from './index';

import { withApollo } from '../lib/apollo';

const LeftGalleryPage = ({ query, pathname }) => {
  return <GalleryPage query={query} pathname={pathname} />;
};

LeftGalleryPage.getInitialProps = ({ query, pathname }) => {
  return {
    query,
    pathname,
  };
};

export default withApollo(LeftGalleryPage);
