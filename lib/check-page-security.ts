// @ts-nocheck
import { NextPageContext } from 'next';

/**
 * Analyse Next JS's `getInitialProps` headers for security purposes
 * @param nextPageContext
 */
const checkPageSecurity = ({ req }: NextPageContext): boolean => {
  if (!req) {
    return true;
  }

  // --------------------------------------------------------------------------
  // EDIT: Add whitelisted ips or hosts below:
  const allowedIps = [process.env.OFF_THE_SHELF_CLIENT_IP];
  const allowedHosts = ['dxlab.sl.nsw.gov.au'];
  // --------------------------------------------------------------------------

  // Do not allow access by default
  let allowAccess = false;

  const isProduction = process.env.NODE_ENV === 'production';
  // const isProduction = true;

  const ip = (
    req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    ''
  )
    .split(',')[0]
    .trim();
  const { host } = req.headers;

  if (isProduction) {
    // Allow access if host or ip is whitelisted
    if (allowedHosts.includes(host) || allowedIps.includes(ip)) {
      allowAccess = true;
    }
  } else {
    // Allow access for development, ie. not on production.
    allowAccess = true;
  }

  return allowAccess;
};

export default checkPageSecurity;
