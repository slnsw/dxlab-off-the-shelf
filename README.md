# Readme

### ENV Variables

```
# .env
GRAPHQL_URL=XXXXX
GTM_ID=XXXXX

# .env.production
GRAPHQL_URL=XXXXX
GTM_ID=XXXXX
```

## Deployment

```
$ npm run deploy:prod
$ now alias dxlab-off-the-shelf-[new-id].now.sh dxlab-off-the-shelf
```

# Notes

- `css-loader` is downgraded to version 1 because 2 and above causes errors in Next - https://github.com/zeit/next-plugins/issues/541
