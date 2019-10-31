import React from 'react';

import GalleryPage from './index';

import { withApollo } from '../lib/apollo';

const RightGalleryPage = ({ query, pathname }) => {
  return <GalleryPage query={query} pathname={pathname} />;
};

RightGalleryPage.getInitialProps = ({ query, pathname }) => {
  return {
    query,
    pathname,
  };
};

export default withApollo(RightGalleryPage);
