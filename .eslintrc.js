module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true
  },
  extends: 'standard',
  overrides: [],
  parserOptions: {
    ecmaVersion: 2022
  },
  rules: {
    'no-unused-vars': 'warn',
    camelcase: ['error', { allow: ['snake_case'] }]
  }
}
