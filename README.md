## 開発環境

### Dependencies

| name          | description            | Version   |
| ------------- | ---------------------- | --------- |
| TypeScript    | -                      | ^5        |
| Next.js       | AppRouter              | ^15.0.3   |
| React         | -                      | 19.0.0-rc |
| TailwindCSS   | -                      | ^3.4.1    |
| ESLint        | リンター               | ^8        |
| Prettier      | フォーマッター         | ^3.3.2    |
| Jotai         | 状態管理               | ^2.8.4    |
| ReactHookForm | フォームライブラリ     | ^7.52.1   |
| zod           | バリデーション         | ^3.23.8   |
| SWR           | データフェッチ         | ^2.2.5    |
| FullCalendar  | カレンダー             | ^6.1.14   |
| emotion       | カレンダーのスタイル   | ^11.11.4  |
| classNames    | スタイリング補助       | ^2.5.1    |
| PostCSS       | css プリプロセッサー   | ^8        |
| StoryBook     | テスト                 | ^8.1.11   |
| svgr          | SVG のコンポーネント化 | ^8.1.0    |
| pathpida      | パスの型生成           | ^0.22.0   |
| npm-run-all   | npm スクリプトツール   | ^4.1.5    |

### npm scripts

| name     | action           | command                     |
| -------- | ---------------- | --------------------------- |
| dev      | 開発モード実行   | next dev                    |
| build    | ビルド           | next build                  |
| start    | 本番モードの起動 | next start                  |
| lint     | コードチェック   | next lint —dir src/app      |
| lint:fix | コード精鋭       | next lint —fix —dir src/app |
| format   | フォーマット実行 | prettier --write            |

# Ts・Lint・Format・Commit ルール

## commit メッセージ制約

```
<gitmoji><Prefix>：<内容><#issue番号>
```

### gitmoji と prefix の種類

| 絵文字 | prefix   | 内容                                                       |
| ------ | -------- | ---------------------------------------------------------- |
| ✨     | feat     | 新機能の実装                                               |
| 🔀     | change   | 既存の機能の変更                                           |
| ⚡️    | perf     | パフォーマンスの改善                                       |
| 🔥     | fire     | 機能・ファイルの削除                                       |
| 🐛     | fix      | バグの修正                                                 |
| 🩹     | typo     | ちょっとした修正(小さなミス・誤字など)                     |
| 📝     | docs     | コードと関係ない部分(Readme・コメントなど)                 |
| 💄     | style    | スタイル関係のファイル(CSS・UI のみの変更など）            |
| ♻️     | refactor | コードのリファクタリング                                   |
| 🎨     | art      | コードのフォーマットを整える(自動整形されたのも含む)       |
| 🔧     | config   | 設定ファイルの追加・更新(linter など)                      |
| ✅     | test     | テストファイル関連(追加・更新など)                         |
| 🚚     | move     | ファイルやディレクトリの移動                               |
| 🎉     | start    | プロジェクトの開始                                         |
| 🚀     | deploy   | デプロイする                                               |
| 🤖     | chore    | 雑多的な変更(ビルドプロセスやツール、ライブラリの変更など) |

## ブランチルール

Git flow を参考に、以下のルールで行う</br>
流れとしては

1. issue を立てる
2. issue に紐づく feature ブランチを作成する (例：feature/#1)
3. PR を作成する → レビューの依頼
4. develop ブランチに merge する

### main

本番環境のブランチ

### develop

開発用のブランチ。feature ブランチの変更を反映し merge して動作の確認を行う。

```
develop/{version}
```

### feature

全ての開発はこのブランチで行う。
develop ブランチから派生させる。
issue 毎にブランチを切る（例：feature/{#issue 番号}）

### release

(TBD)
develop から merge する
main ブランチに merge する前に確認する作業を行う

### hotfix

(TBD)
main ブランチから派生する
リリース後に起きた緊急のバグ対応を行う
