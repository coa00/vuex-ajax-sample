module.exports = {
  root: true,
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 2016,
    sourceType: "module"
  },
  extends: [
    "eslint:recommended",
    "prettier",
    "plugin:prettier/recommended",
    "plugin:vue/essential"
  ],
  plugins: ["vue", "prettier"],
  env: {
    mocha: true,
    jest: true,
    browser: true,
    node: true,
    es6: true
  },
  globals: {
    page: true
  },
  rules: {
    "prettier/prettier": "error"
  }
};
