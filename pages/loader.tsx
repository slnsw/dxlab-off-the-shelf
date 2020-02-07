import React from 'react';
import Router from 'next/router';

import Loader from '../components/Loader';
import checkPageSecurity from '../lib/check-page-security';

const LoaderPage = () => {
  const [isActive, setIsActive] = React.useState(true);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
      onClick={() => {
        setIsActive(!isActive);
      }}
    >
      <Loader isActive={isActive} strokeWidth={4} delay={0} />
    </div>
  );
};

const redirectUrl = 'https://dxlab.sl.nsw.gov.au/off-the-shelf';

LoaderPage.getInitialProps = (context) => {
  const { res } = context;

  if (checkPageSecurity(context)) {
    return {};
  }

  if (res) {
    res.writeHead(302, {
      Location: redirectUrl,
    });
    res.end();
  } else {
    Router.push(redirectUrl);
  }

  return {};
};

export default LoaderPage;
