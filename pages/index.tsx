// import React from 'react';
import Router from 'next/router';

const HomePage = () => {
  return null;
};

HomePage.getInitialProps = ({ res }) => {
  if (res) {
    res.writeHead(302, {
      Location: '/gallery/test',
    });
    res.end();
  } else {
    Router.push('/gallery/test');
  }

  return {};
};

export default HomePage;
