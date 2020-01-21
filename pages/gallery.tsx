import React from 'react';
import Router from 'next/router';

import OffTheShelfApp from '../components/OffTheShelfApp';

import { withApollo } from '../lib/apollo';
import { createHealthCheck } from '../lib/health-check';
import * as configs from '../configs';

const GalleryPage = ({ query }) => {
  const position = query && query.position ? query.position : null;

  /*
   * Set initial logs and health checks
   */
  React.useEffect(() => {
    if (!window.OFF_THE_SHELF) {
      console.log('----------------------------------------');
      window.OFF_THE_SHELF = Object.keys(configs).map((key) => {
        console.log(key, configs[key]);

        return `${key}: ${configs[key]}`;
      });
      console.log('----------------------------------------');
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
    />
  );
};

GalleryPage.getInitialProps = ({ query, pathname, res }) => {
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

export default withApollo(GalleryPage);
