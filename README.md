# DX Lab - Off the Shelf

All books published in NSW, and many from beyond, live in your State Library — millions of them in a maze of shelves underground. A digital experience in the galleries, Off the Shelf encourages the reader to virtually browse the Library’s book collection and uncover the many intriguing, perplexing and playful volumes waiting to be read. From bodice rippers to banksia trees, cats to catafalques, turnips to teleology — whatever you’re into, we’ve got a book for it.

Visit the website: [dxlab.sl.nsw.gov.au/off-the-shelf](https://dxlab.sl.nsw.gov.au/off-the-shelf)

> This repo is for reference only! A custom GraphQL server is required to run this app properly. Feel free to check out the code, but please note it is highly experimental in nature.

## Routes

This application has two main routes:

1. `/gallery/[position]` - starting point for in-gallery exhibition. `position` can be `left`, `right` or `test`.
1. `/off-the-shelf` - web version for mobile and desktop devices. This path is accessible from `dxlab.sl.nsw.gov.au/off-the-shelf`.

## Getting Started

```
# Make sure Node 10.16.3 or greater is installed and local .env file is set up
$ npm install
$ npm run dev
```

## Environment Variables

### Local

```
# .env file
OFF_THE_SHELF_GRAPHQL_URL=XXXXX
OFF_THE_SHELF_BASE_URL=http://localhost:5040
OFF_THE_SHELF_FB_APP_ID=XXXXXX

# These are optional for local testing
OFF_THE_SHELF_GTM_ID=GTM-XXXXXXX
OFF_THE_SHELF_LEFT_HEALTHCHECK_URL=https://hc-ping.com/XXXXXXXXXXXXXXXXXXXXX
OFF_THE_SHELF_RIGHT_HEALTHCHECK_URL=https://hc-ping.com/XXXXXXXXXXXXXXXXXXXXX

# The /gallery route only allows access to this IP. In Zeit Now, it is set as the public IP of the two gallery PCs
OFF_THE_SHELF_CLIENT_IP=XXXXXX
```

### Staging and Production

No `.env` files are required for staging and production deployments. This app uses `now.json`, `now.staging.json` and `now.dev.json` files to point to Zeit Now's **secrets** during build and runtime.

## Deployment

```
# Production
$ npm run deploy:prod

# Staging
$ npm run deploy:staging
$ now alias dxlab-off-the-shelf-[new-id].now.sh dxlab-staging-off-the-shelf
# NOTE: Still working out how to auto alias

# Dev
$ npm run deploy:dev
$ now alias dxlab-off-the-shelf-[new-id].now.sh dxlab-dev-off-the-shelf
# NOTE: Still working out how to auto alias
```

# Notes

- `css-loader` is downgraded to version 1 because 2 and above causes errors in Next - https://github.com/zeit/next-plugins/issues/541

# Cached Book Data

In an attempt to speed up site loading, the site now gets the basic skeletal books data from a JSON file `data.json` stored in `/public/off-the-shelf/data/` rather than from the GraphQL endpoint.

There is a script to create/refresh/overwrite the `data.json` file from the GraphQL source. It is called `create-data-cache.js` and lives in `/scripts/`. It is run on the command line like so: `node scripts/create-data-cache.js`

Currently the site DOES NOT fall back to using GraphQL if the data file is not present. Just make sure it is there. :)
