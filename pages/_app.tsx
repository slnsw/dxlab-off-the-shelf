import React from 'react';
import App from 'next/app';
import Head from 'next/head';

import { buildHeadTitle } from '../lib';
import { initGA } from '../lib/analytics';

import '../node_modules/normalize.css/normalize.css';
import '../styles/base.scss';
import SocialMetaHead from '../components/SocialMetaHead';

declare global {
  interface Window {
    GA_INITIALIZED?: boolean;
  }
}

class MyApp extends App {
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
  // static async getInitialProps(appContext) {
  //   // calls page's `getInitialProps` and fills `appProps.pageProps`
  //   const appProps = await App.getInitialProps(appContext);
  //
  //   return { ...appProps }
  // }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      if (!window.GA_INITIALIZED) {
        initGA();
        window.GA_INITIALIZED = true;
      }
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    const title = buildHeadTitle();
    const description =
      'Off the Shelf brings you snapshots of the intriguing, perplexing and playful volumes in the underground book stacks waiting to be read';
    const imageUrl = '/off-the-shelf/images/SLNSW-stack.jpg';
    const imageAlt = 'Mitchell library stack, by Merinda Campbell';

    return (
      <>
        <SocialMetaHead
          title={title}
          description={description}
          imageUrl={imageUrl}
          imageAlt={imageAlt}
          siteName="Off the Shelf - DX Lab | State Library of NSW"
        />

        <Head>
          <title>{buildHeadTitle()}</title>

          <link
            rel="stylesheet"
            type="text/css"
            href="https://cloud.typography.com/6321554/7275212/css/fonts.css"
          />

          <link
            rel="shortcut icon"
            href="https://www.sl.nsw.gov.au/sites/all/themes/slnsw_frontend/favicon.ico"
            type="image/vnd.microsoft.icon"
          />

          <link
            href="https://unpkg.com/ionicons@4.2.5/dist/css/ionicons.min.css"
            rel="stylesheet"
          />

          <script src="https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver"></script>
        </Head>

        <Component {...pageProps} />
      </>
    );
  }
}

export default MyApp;
