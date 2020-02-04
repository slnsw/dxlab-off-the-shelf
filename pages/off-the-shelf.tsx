import React from 'react';

import OffTheShelfApp from '../components/OffTheShelfApp';

import { withApollo } from '../lib/apollo';
import * as configs from '../configs';

const OffTheShelfPage = ({ query }) => {
  /*
   * Set initial logs and health checks
   */
  React.useEffect(() => {
    if (!window.OFF_THE_SHELF) {
      console.log('--------------(configs)-------------------');
      window.OFF_THE_SHELF = Object.keys(configs).map((key) => {
        console.log(key, configs[key]);

        return `${key}: ${configs[key]}`;
      });
      console.log('-----------------[end]--------------------');
    }
  }, []);

  return (
    <OffTheShelfApp
      query={query}
      basePathnameHref={'/off-the-shelf'}
      basePathnameAs={'/off-the-shelf'}
      booksTotal={80}
      mode={'web'}
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
