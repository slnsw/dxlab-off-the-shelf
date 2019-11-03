# DX Lab - Off the Shelf

### ENV Variables

```
# .env
GRAPHQL_URL=XXXXX
OFF_THE_SHELF_GTM_ID=XXXXX
```

## Deployment

```
# Production
$ npm run deploy:prod

# Staging
$ npm run deploy:staging
$ now alias dxlab-off-the-shelf-[new-id].now.sh dxlab-staging-off-the-shelf
# Still working out auto alias
```

# Notes

- `css-loader` is downgraded to version 1 because 2 and above causes errors in Next - https://github.com/zeit/next-plugins/issues/541
