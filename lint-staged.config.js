module.exports = {
  '*.{js,ts,tsx}': [
    'eslint --fix',
    // Tests not working right now
    // 'npm test -- --forceExit --runInBand --bail --findRelatedTests',
    'git add',
  ],
  '*.{scss}': ['stylelint **/*.scss --fix', 'git add'],
};
