module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    browser: true
  },
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaFeatures: {
      legacyDecorators: true
    },
    ecmaVersion: 6
  },
  extends: [
    '@nuxtjs/eslint-config-typescript'
  ],
  rules: {
    'no-console': 'off',
    indent: 2
  }
}
