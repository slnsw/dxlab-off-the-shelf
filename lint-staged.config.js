module.exports = {
  '*.{js,ts,tsx,scss}': [
    'eslint --fix',
    'stylelint **/*.scss --fix',
    'npm test -- --forceExit --runInBand --bail --findRelatedTests',
    'git add',
  ],
};
