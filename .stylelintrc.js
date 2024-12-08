module.exports = {
  plugins: [
    // displayプロパティの値によって無視されるプロパティを記載していないか検知するルールを追加するプラグイン
    'stylelint-declaration-block-no-ignored-properties',
  ],
  extends: [
    // プロパティの記述順に関するルール
    'stylelint-config-recess-order',
    // 一般的なルール
    'stylelint-config-standard',
  ],
  rules: {
    'plugin/declaration-block-no-ignored-properties': true,
    'at-rule-no-unknown': [
      // tailwindcssの@ruleを無視する
      true,
      {
        ignoreAtRules: ['tailwind'],
      },
    ],
  },
  ignoreFiles: ['**/node_modules/**'],
}
