import React from 'react';
import App from 'next/app';
import Head from 'next/head';

import { initGA } from '../lib/analytics';

import '../node_modules/normalize.css/normalize.css';
import '../styles/base.scss';

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
    return (
      <>
        <Head>
          <title>Off the Shelf</title>
          {/* <link
            href="https://fonts.googleapis.com/css?family=Barlow:400,500,500i,700"
            rel="stylesheet"
          /> */}
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cloud.typography.com/6321554/7275212/css/fonts.css"
          />
          <link rel="icon" href="/favicon.ico" importance="low" />
        </Head>

        <Component {...pageProps} />
      </>
    );
  }
}

export default MyApp;
