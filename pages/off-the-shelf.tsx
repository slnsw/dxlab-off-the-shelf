import React from 'react';

import OffTheShelfApp from '../components/OffTheShelfApp';

import { withApollo } from '../lib/apollo';

const OffTheShelfPage = ({ query }) => {
  return (
    <OffTheShelfApp
      query={query}
      basePathnameHref={'/off-the-shelf'}
      basePathnameAs={'/off-the-shelf'}
      booksTotal={80}
      hasHeader={true}
      showAboutPageLogo={false}
      enablePrevBookId={false}
    />
  );
};

OffTheShelfPage.getInitialProps = ({ query, pathname }) => {
  return {
    query,
    pathname,
  };
};

export default withApollo(OffTheShelfPage);
