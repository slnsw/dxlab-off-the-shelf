import Router from 'next/router';

const HomePage = () => {
  return null;
};

const redirectUrl = `${process.env.OFF_THE_SHELF_BASE_URL}/off-the-shelf`;

HomePage.getInitialProps = ({ res }) => {
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

export default HomePage;
