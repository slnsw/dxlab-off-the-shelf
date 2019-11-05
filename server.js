const express = require('express');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

/**
 * WARNING: Only use this for local development
 *
 * This server.js file enables assetPrefix in next.config.js to work in local
 * development. Server.js doesn't seem to work when deployed by Now, so
 * now.json and now.staging.json has a 'routes' rule that proxies
 * '/off-the-shelf/assets/_next/' to '/_next/'
 */

app.prepare().then(() => {
  const server = express();

  server.use('/off-the-shelf/assets', app.getRequestHandler());

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
