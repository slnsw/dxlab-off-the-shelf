import React from 'react';
import Router from 'next/router';

import OffTheShelfApp from '../components/OffTheShelfApp';

// import { withApollo } from '../lib/apollo';
import { createHealthCheck } from '../lib/health-check';
import * as configs from '../configs';
import checkPageSecurity from '../lib/check-page-security';

const GalleryPage = ({ query }) => {
  const position = query && query.position ? query.position : null;

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

    if (position === 'left' && process.env.OFF_THE_SHELF_LEFT_HEALTHCHECK_URL) {
      const healthCheck = createHealthCheck(
        process.env.OFF_THE_SHELF_LEFT_HEALTHCHECK_URL,
        120000,
      );

      healthCheck.start();
    } else if (
      position === 'right' &&
      process.env.OFF_THE_SHELF_RIGHT_HEALTHCHECK_URL
    ) {
      const healthCheck = createHealthCheck(
        process.env.OFF_THE_SHELF_RIGHT_HEALTHCHECK_URL,
        120000,
      );

      healthCheck.start();
    }
  }, []);

  return (
    <OffTheShelfApp
      query={query}
      position={position}
      basePathnameHref={'/gallery/[position]'}
      basePathnameAs={`/gallery/${position}`}
      mode={'gallery'}
    />
  );
};

const redirectUrl = 'https://dxlab.sl.nsw.gov.au/off-the-shelf';

GalleryPage.getInitialProps = (context) => {
  const { query, pathname, res } = context;

  if (checkPageSecurity(context) === false) {
    if (res) {
      res.writeHead(302, {
        Location: redirectUrl,
      });
      res.end();
    } else {
      Router.push(redirectUrl);
    }

    return {};
  }

  if (pathname === '/gallery') {
    if (res) {
      res.writeHead(302, {
        Location: '/gallery/test',
      });
      res.end();
    } else {
      Router.push('/gallery/test');
    }
  }

  return {
    query,
    pathname,
  };
};

export default GalleryPage;
