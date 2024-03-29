# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2022-10-01

- Update to Node 16 (WIP)

## [1.1.7] - 2020-03-10

- Update graphql url to api.dxlab.sl.nsw.gov.au/graphql
- Deploy with Now 17.04 which creates a .now folder and updates gitignore

## [1.1.6] - 2020-02-14

- Update gallery end date

## [1.1.5] - 2020-02-12

- Fix jerky scrolling that appeared after 10-15 min operation by removing `<Link>` and `<a>` tags wrapping each book
- Removed gap after logo animate out and before re-appear

## [1.1.4] - 2020-02-10

- Actually merge with develop this time
- Add `check-page-security` function
- Add page security for `/gallery` route
- Fix SSR book card page on mobile

## [1.1.3] - 2020-02-10

- OOPS

## [1.1.2] - 2020-02-05

- Fix `gallery` mode routing issues
- Use larger images for BookCard in `gallery` mode
- Update `data.json` file

## [1.1.1] - 2020-02-04

- Make random button animate during randomisation
- Add config to web mode logs

## [1.1.0] - 2020-01-20

- Update useDimensions to use `useLayoutEffect`
- Remove `setIsModalActive` from gallery.tsx, derive it from `bookId` instead
- Create `OffTheShelfApp` component to share between `web` and `gallery` modes
- Add responsive versions of `AboutModal` and `BookCardModal`
- Add header for `web` mode
- Create `SocialMetaHead` component for social meta tags
- Add `ShareBox` component
- Add script to save all book data from API. Use this data on first load to improve performance.
- Improve `idleTimer` behaviour
- Use optimised Cloudinary jpgs rather than large pngs

## [1.0.6] - 2019-11-11

- Update AboutModal image preload link
- Update TS and Prettier to enable optional chaining and nullish coalescing

## [1.0.5] - 2019-11-06

- Move images into `off-the-shelf/` folder

## [1.0.4] - 2019-11-05

- Add server.js for local dev
- Update `now.json` and `now.staging.json` with proxy routes for Zeit Now
- Add `off-the-shelf` page

## [1.0.3] - 2019-11-04

- Add clean URLs
- Fix subtle bug in 'books in view' checking

## [1.0.2] - 2019-11-01

- Add GTM environment variable `OFF_THE_SHELF_GTM_ID` as Zeit Now secret

## [1.0.1] - 2019-11-01

- Add healthcheck
- Rename `/?side=left|right` to `/?position=left|right`
- Add BookSpine toggle

## [1.0.0] - 2019-11-01

- Exhibition go live!
- Heaps of changes
- Add Framer Motion
- Add BookShelf, BookShelves, BookSpines, BookCard components
- Add Modal components for Book and About pages
- Add Apollo GraphQL client
- Add left and right side params

## [0.1.2] - 2019-10-03

- Fix lint-staged config

## [0.1.1] - 2019-10-03

- Install testing-library, stylelint, eslint, prettier, husky, lint-staged, typescript, hygen and more
