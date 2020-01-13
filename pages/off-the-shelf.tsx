import React from 'react';

import OffTheShelfApp from '../components/OffTheShelfApp';

import { withApollo } from '../lib/apollo';

const OffTheShelfPage = () => {
  return <OffTheShelfApp />;
};

export default withApollo(OffTheShelfPage);
