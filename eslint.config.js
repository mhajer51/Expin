const expo = require('eslint-config-expo/flat');
const prettier = require('eslint-config-prettier');

module.exports = [
  ...expo,
  prettier,
  {
    ignores: ['.expo/**', 'node_modules/**', 'dist/**'],
    rules: {
      'react/display-name': 'off',
      'import/no-unresolved': 'off'
    }
  }
];
