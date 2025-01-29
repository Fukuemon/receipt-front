module.exports = {
  plugins: [
    // displayプロパティの値によって無視されるプロパティを記載していないか検知するルールを追加するプラグイン
    'stylelint-declaration-block-no-ignored-properties',
  ],
  extends: [
    // プロパティの記述順に関するルール
    // 一般的なルール
    'stylelint-config-standard',
    // CSS Modules対応のルール
    'stylelint-config-css-modules',
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
    // クラス名にキャメルケースを許容する
    'selector-class-pattern': [
      '^[a-zA-Z_][a-zA-Z0-9_]*$',
      {
        message:
          'クラス名はキャメルケース（例: myClassName）を使用してください。',
      },
    ],
  },
  ignoreFiles: ['**/node_modules/**'],
}
