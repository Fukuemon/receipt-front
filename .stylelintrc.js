module.exports = {
  extends: [
    "stylelint-config-recess-order",
    "stylelint-config-recommended-scss",
  ],
  rules: {
    // ::before, ::afterのコロンを2つにする
    "selector-pseudo-element-colon-notation": "double",
    // シングルクォーテーションに統一
    "string-quotes": "single",
  },
  ignoreFiles: ["**/node_modules/**"],
};
