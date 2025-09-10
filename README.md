# toriijusetsu.com

鳥井住設のウェブサイト

このリポジトリは、**Astro** + **React** + **Tailwind CSS v4** + **TypeScript** をベースとしたフロントエンド開発用のボイラープレートです。
パーシャルハイドレーションやマルチフレームワーク、静的生成、最小限のJavaScriptによる高パフォーマンスを重視しています。

---

## 🚀 プロジェクト概要

- **Astro**: 静的サイト生成・パーシャルハイドレーション・マルチフレームワーク対応
- **React**: インタラクティブなUIコンポーネント
- **Tailwind CSS v4**: ユーティリティファーストなCSS設計
- **TypeScript**: 型安全な開発
- **アクセシビリティ/SEO**: セマンティックHTML・OGP・メタタグ・レスポンシブ対応
- **パフォーマンス**: コアウェブバイタル重視、Lighthouse監査推奨

---

## 📁 ディレクトリ構成

```text
/
├── public/                # 静的アセット
├── src/
│   ├── assets/            # 画像・SVG等
│   ├── components/        # Atomic DesignベースのUIコンポーネント
│   │   ├── atoms/
│   │   ├── molecules/
│   │   ├── templates/
│   │   ├── vi/
│   │   └── scripts/
│   ├── layouts/           # レイアウトコンポーネント
│   ├── pages/             # ファイルベースルーティング
│   ├── styles/            # グローバル/ユーティリティCSS
│   └── site.config.json   # サイト設定・メタ情報
├── astro.config.mjs       # Astro設定
├── tailwind.config.js     # Tailwind CSS設定
├── package.json           # 依存パッケージ
└── README.md
```

---

## 🛠️ 技術スタック

- **Astro** `^5.7.2`
  - @astrojs/react, astro-icon, @astrojs/check
- **React** `^19.1.0`
- **Tailwind CSS** `^4.1.4`
  - @tailwindcss/forms, @tailwindcss/typography
- **TypeScript** `^5.8.3`
- **その他**: framer-motion, gsap, keen-slider, vaul, lucide-react, iconify, sharp など

---

## 📝 開発・運用ルール

- **命名規則**: Astro/JS/TSはキャメルケース、CSSはBEM、Tailwindはユーティリティ順
- **ディレクトリ**: Atomic Design準拠、`src/components/atoms`等に分類
- **スタイリング**: Tailwind CSS中心、グローバルCSSは`@theme`/`@layer`で管理
- **アクセシビリティ**: セマンティックHTML・ARIA属性・キーボード対応
- **SEO**: OGP/メタタグ/カノニカル/再利用可能SEOコンポーネント
- **コミット/PR**: Conventional Commits、PR説明必須、CI/CD推奨
- **テスト**: ユニットテスト（必要に応じて）、E2EはCypress等を推奨

---

## 💻 主要コマンド

| コマンド                | 説明                                         |
|------------------------|----------------------------------------------|
| `npm install`          | 依存パッケージのインストール                 |
| `npm run dev`          | 開発サーバー起動（`localhost:4321`）         |
| `npm run build`        | 本番ビルド（`./dist/`）                      |
| `npm run preview`      | 本番ビルドのローカルプレビュー               |
| `npm run lint`         | ESLintによる静的解析                         |
| `npm run format`       | Prettierによるコード整形                     |
| `npm run check`        | Astro公式の型・構文チェック                  |

---

## 🌐 参考リンク

- [Astro公式ドキュメント](https://docs.astro.build)
- [Tailwind CSS公式](https://tailwindcss.com/)
- [React公式](https://react.dev/)
- [TypeScript公式](https://www.typescriptlang.org/)

---

## 🏢 サイト情報（例）

- サイト名: ○○○○
- ドメイン: <https://www.dummy.co.jp>
- 運営会社: ダミー株式会社
- 住所: 東京都千代田区1-1-1
- お問い合わせ: <info@dummy.co.jp>

---

## 📄 ライセンス

このリポジトリはMITライセンスで公開されています。
