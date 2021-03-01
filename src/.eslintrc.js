module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    browser: true
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
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
    semi: [2, 'never'],
    'no-console': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/script-indent': ['error', 2, { baseIndent: 0 }],
    indent: ['error', 2, { SwitchCase: 1 }],
    'space-before-function-paren': 'off'
    // 'prettier/prettier': ['error', { semi: false }]
  }
}
