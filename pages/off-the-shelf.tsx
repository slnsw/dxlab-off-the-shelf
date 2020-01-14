import React from 'react';

import OffTheShelfApp from '../components/OffTheShelfApp';

import { withApollo } from '../lib/apollo';

const OffTheShelfPage = ({ query, pathname }) => {
  return <OffTheShelfApp query={query} basePathname={pathname} />;
};

OffTheShelfPage.getInitialProps = ({ query, pathname }) => {
  return {
    query,
    pathname,
  };
};

export default withApollo(OffTheShelfPage);
