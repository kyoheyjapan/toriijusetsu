# Claude Code ボイラープレート環境整備ガイド

## 1. プロジェクト環境分析用プロンプト

### 基本環境分析

```
既存のプロジェクト環境を分析して、以下の情報を整理してください：

**プロジェクト構造分析**
- プロジェクトのルートディレクトリ構造を確認
- package.json, requirements.txt, Gemfile等の依存関係ファイルを特定
- 設定ファイル（.env, config/, etc/）の確認
- ドキュメント構造の把握

**技術スタック特定**
- 使用言語とバージョン
- フレームワーク・ライブラリ
- データベース・ストレージ
- インフラ・デプロイメント方式
- 開発ツール・CI/CD設定

**コーディング規約・パターン確認**
- 既存のコードスタイル
- ディレクトリ命名規則
- ファイル構造パターン
- import/require文の記述方式
- エラーハンドリングパターン

上記の分析結果を踏まえて、一貫性のあるボイラープレート環境を提案してください。
```

### 依存関係・設定ファイル分析

```
以下のファイルを確認し、ボイラープレート環境に必要な設定を抽出してください：

**チェック対象ファイル**
- package.json / package-lock.json
- requirements.txt / Pipfile
- Gemfile / Gemfile.lock
- composer.json
- pom.xml / build.gradle
- .env / .env.example
- tsconfig.json / jsconfig.json
- .eslintrc / .prettierrc
- docker-compose.yml / Dockerfile
- .gitignore
- README.md

**抽出情報**
- 必須依存関係
- 開発依存関係
- 環境変数設定
- ビルド・実行スクリプト
- 品質管理ツール設定

これらの情報を基に、新しいプロジェクト用のボイラープレート設定を生成してください。
```

## 2. ボイラープレート生成プロンプト

### フロントエンド環境（React/Vue/Angular）

```
既存プロジェクトの分析結果を基に、以下のフロントエンド ボイラープレートを生成してください：

**基本構成**
- プロジェクト初期化（package.json）
- TypeScript設定（tsconfig.json）
- バンドラー設定（Webpack/Vite）
- CSS preprocessor設定
- 品質管理ツール設定（ESLint, Prettier, Husky）

**ディレクトリ構造**
```

src/
├── components/
│   ├── ui/
│   └── features/
├── pages/
├── hooks/
├── utils/
├── services/
├── types/
├── styles/
└── assets/

```

**開発支援ファイル**
- .env.example
- .gitignore
- README.md（セットアップ手順付き）
- docker-compose.yml（必要に応じて）

既存プロジェクトのコーディング規約を維持しながら、モダンなベストプラクティスを適用してください。
```

### バックエンド環境（Node.js/Python/Java）

```
既存のバックエンド環境を参考に、以下のボイラープレートを作成してください：

**API構造**
- RESTful API設計
- 認証・認可システム
- データベース接続設定
- ミドルウェア設定
- エラーハンドリング

**ディレクトリ構造例（Node.js）**
```

src/
├── controllers/
├── models/
├── services/
├── middleware/
├── routes/
├── utils/
├── config/
└── tests/

```

**開発環境設定**
- 環境変数管理
- ログ設定
- テスト環境設定
- データベースマイグレーション
- API ドキュメント生成

既存プロジェクトのアーキテクチャパターンを継承しつつ、拡張性の高い構造を実装してください。
```

### フルスタック環境

```
フロントエンドとバックエンドの統合ボイラープレートを作成してください：

**統合設定**
- モノレポ構成（必要に応じて）
- 共通型定義
- API クライアント生成
- 開発サーバー連携
- ビルド・デプロイパイプライン

**開発ワークフロー**
- Hot reload設定
- プロキシ設定
- データベースシード
- テストデータ生成
- 開発用モック

既存プロジェクトの技術スタックを活用し、開発効率を最大化する統合環境を構築してください。
```

## 3. 品質管理・ルール設定

### コーディング規約ファイル（.eslintrc.js）

```javascript
module.exports = {
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    // 既存プロジェクトの規約を継承
    'no-console': 'warn',
    'no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    // プロジェクト固有のルール
  }
};
```

### Git フック設定（.husky/）

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run lint
npm run test
```

### 環境変数テンプレート（.env.example）

```env
# Database
DATABASE_URL=postgresql://localhost:5432/myapp
DATABASE_PASSWORD=

# API Keys
API_KEY=
JWT_SECRET=

# Development
NODE_ENV=development
PORT=3000
```

### Cursor AI設定（.cursorrules）

```
# プロジェクト固有の開発ルール
## 使用技術スタック
- フロントエンド: React 18, TypeScript, Tailwind CSS
- バックエンド: Node.js, Express, PostgreSQL
- 認証: JWT, OAuth2
- テスト: Jest, Testing Library
- ビルド: Vite, ESBuild

## コーディング規約
### 基本原則
- 型安全性を重視し、any型の使用を避ける
- 関数は小さく、単一責任の原則を守る
- 命名は明確で理解しやすいものにする
- コメントは「なぜ」を説明し、「何を」は避ける

### ファイル・ディレクトリ命名規則
- コンポーネント: PascalCase (Button.tsx, UserProfile.tsx)
- 関数・変数: camelCase (getUserData, isAuthenticated)
- 定数: UPPER_SNAKE_CASE (API_ENDPOINTS, MAX_RETRY_COUNT)
- CSS/styled-components: kebab-case (user-profile, nav-menu)

### 推奨パターン
- 関数コンポーネント優先、必要時のみクラス使用
- カスタムフック活用によるロジック分離
- 条件分岐にはearly returnを使用
- 非同期処理はasync/awaitを使用し、適切なエラーハンドリングを実装

### 禁止事項
- console.log本番環境への残存
- 未使用変数・import
- 魔法の数字（定数で定義）
- 深いネスト（3レベル以上）
- 長すぎる関数（50行以上）

## API設計規約
### RESTful API
- GET: データ取得
- POST: 新規作成
- PUT: 全体更新
- PATCH: 部分更新
- DELETE: 削除

### エンドポイント命名
- 複数形を使用 (/users, /posts)
- ケバブケース使用 (/user-profiles, /api-keys)
- 動詞は避ける (×/getUsers, ○/users)

### レスポンス形式
```typescript
interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
  timestamp: string;
}

interface ErrorResponse {
  error: string;
  message: string;
  status: number;
  timestamp: string;
}
```

## データベース設計

### 命名規則

- テーブル名: 複数形スネークケース (users, user_profiles)
- カラム名: スネークケース (created_at, user_id)
- 外部キー: {table_name}_id (user_id, post_id)
- インデックス: idx_{table_name}_{column_name}

### 設計原則

- 主キーは必ずid(UUID推奨)
- 作成日時(created_at)、更新日時(updated_at)を必須とする
- 論理削除にはdeleted_atカラムを使用
- 外部キー制約を適切に設定

## React/TypeScript固有ルール

### コンポーネント設計

- propsの型定義を必ず行う
- defaultPropsではなくデフォルト引数を使用
- 条件付きレンダリングには短絡評価を使用
- 重複ロジックはカスタムフックで抽象化

### 状態管理

- ローカル状態はuseState/useReducer
- グローバル状態はZustand/Redux Toolkit
- サーバー状態はTanStack Query
- フォーム状態はReact Hook Form

### パフォーマンス最適化

- useMemo/useCallbackを適切に使用
- 大きなリストにはvirtualizationを検討
- 画像の遅延読み込みを実装
- バンドルサイズの監視

## セキュリティ要件

### 認証・認可

- JWT有効期限の適切な設定
- リフレッシュトークンの安全な管理
- CORS設定の適切な制限
- 入力値サニタイズの実装

### データ保護

- 機密データの暗号化
- 環境変数による機密情報管理
- SQLインジェクション対策
- XSS対策の実装

## テスト戦略

### 単体テスト

- 各関数・メソッドの単体テスト
- 境界値テストの実装
- モックの適切な使用
- カバレッジ80%以上を目指す

### 統合テスト

- API エンドポイントの統合テスト
- データベース操作の統合テスト
- 認証フローの統合テスト

### E2Eテスト

- 重要なユーザーフローをカバー
- 本番環境に近い環境での実行

## 推奨ライブラリ・ツール

### 開発効率向上

- 型生成: zod, @apidevtools/swagger-parser
- 日付操作: date-fns
- フォーム: react-hook-form, zod-resolver
- HTTP通信: axios, fetch API

### UI・スタイリング

- UIコンポーネント: Radix UI, Mantine
- アイコン: lucide-react, react-icons
- スタイリング: Tailwind CSS, styled-components
- レスポンシブ対応: CSS Grid, Flexbox

### 状態管理・データフェッチ

- グローバル状態: zustand, jotai
- サーバー状態: @tanstack/react-query
- フォーム状態: react-hook-form
- 非同期処理: async/await, Promise.all

## エラーハンドリング

### フロントエンド

- Error Boundary の実装
- try-catch による適切なエラー処理
- ユーザーフレンドリーなエラーメッセージ
- エラーログの記録

### バックエンド

- 統一されたエラーレスポンス形式
- 適切なHTTPステータスコード
- スタックトレースの本番環境除外
- 構造化ログの活用

## パフォーマンス最適化

### フロントエンド

- 画像最適化（WebP、lazy loading）
- コードスプリッティング
- 不要なre-render防止
- バンドルサイズ最適化

### バックエンド

- データベースクエリ最適化
- 適切なインデックス設計
- キャッシュ戦略の実装
- 非同期処理の活用

## 開発ワークフロー

### Git フロー

- main: 本番環境用
- develop: 開発統合用
- feature/*: 機能開発用
- hotfix/*: 緊急修正用

### コミット規約

- feat: 新機能追加
- fix: バグ修正
- docs: ドキュメント更新
- style: スタイル修正
- refactor: リファクタリング
- test: テスト追加・修正

## 推奨する質問・提案パターン

1. 新しい機能追加時は、既存のパターンと一貫性を保つ方法を提案
2. パフォーマンスに影響する変更時は、最適化案を提示
3. セキュリティ要件に関わる変更時は、潜在的なリスクを指摘
4. 型定義やインターフェース変更時は、影響範囲を説明
5. 複雑な実装時は、シンプルな代替案を提案

## 開発支援

- コードレビュー時は上記ルールに基づく指摘
- 新しい技術や手法を提案する際は、既存コードとの整合性を考慮
- 最新のベストプラクティスを積極的に提案
- 可読性・保守性の向上を常に意識

```

### Cursor AI設定生成プロンプト
```

既存プロジェクトの分析結果を基に、Cursor AI用の.cursorrulesファイルを生成してください：

**設定に含める項目**

- 使用技術スタック（言語、フレームワーク、ライブラリ）
- コーディング規約（命名規則、スタイル、禁止事項）
- アーキテクチャ方針（ファイル構成、依存関係管理）
- API設計規約（RESTful、GraphQL等）
- データベース設計規約（命名、制約、インデックス）
- セキュリティ要件（認証、認可、データ保護）
- テスト戦略（単体、統合、E2E）
- パフォーマンス最適化指針
- エラーハンドリング方針
- 開発ワークフロー（Git、コミット規約）
- 推奨ライブラリ・ツール
- 質問・提案パターン

**既存プロジェクトから継承する要素**

- 現在のコード構造とパターン
- 使用中のライブラリとバージョン
- 既存のコーディング規約
- 命名規則と定数定義
- エラーハンドリング方式
- テスト戦略

上記を踏まえた、プロジェクト固有の包括的な.cursorrulesファイルを作成してください。

```

### Step 1: 環境分析
```bash
# Claude Codeを起動
claude-code

# 既存プロジェクトの分析を実行
> 上記「プロジェクト環境分析用プロンプト」を実行
```

### Step 2: ボイラープレート生成

```bash
# 新しいプロジェクトディレクトリを作成
mkdir new-project-boilerplate
cd new-project-boilerplate

# Claude Codeでボイラープレート生成
> 上記「ボイラープレート生成プロンプト」を実行
```

### Step 3: 設定ファイルのカスタマイズ

```bash
# 生成されたファイルを確認・調整
> 生成されたpackage.json、設定ファイルを確認し、既存プロジェクトの要件に合わせて調整してください
```

### Step 4: 動作確認

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# テストの実行
npm run test
```

## 5. 考慮事項チェックリスト

### 技術的考慮事項

- [ ] 既存プロジェクトとの技術スタック整合性
- [ ] バージョン互換性の確認
- [ ] パフォーマンス要件の継承
- [ ] セキュリティ要件の維持
- [ ] スケーラビリティの考慮

### 開発体験

- [ ] 開発者オンボーディングの簡素化
- [ ] デバッグ環境の整備
- [ ] ホットリロード・自動テスト
- [ ] コード品質の自動チェック
- [ ] ドキュメント生成の自動化

### 運用・保守性

- [ ] ログ・モニタリング設定
- [ ] エラー追跡システム
- [ ] CI/CD パイプライン
- [ ] 依存関係の定期更新
- [ ] バックアップ・リカバリ手順

### チーム開発

- [ ] コーディング規約の統一
- [ ] レビュープロセスの標準化
- [ ] ブランチ戦略の設定
- [ ] タスク管理との連携
- [ ] 知識共有の仕組み
- [ ] Cursor AI設定の共有と統一

### AI開発支援

- [ ] .cursorrulesの適切な設定
- [ ] AI補完の精度向上
- [ ] プロジェクト固有の開発パターン学習
- [ ] コードレビューのAI支援
- [ ] ドキュメント生成の自動化

## 6. 追加リソース

### 参考設定ファイル

- `tsconfig.json`: TypeScript設定
- `jest.config.js`: テスト設定
- `webpack.config.js`: ビルド設定
- `docker-compose.yml`: 開発環境コンテナ
- `.github/workflows/`: GitHub Actions設定
- `.cursorrules`: Cursor AI設定
- `.vscode/settings.json`: VS Code設定（Cursor互換）

### 推奨ツール

- **開発環境**: Docker, Docker Compose
- **品質管理**: ESLint, Prettier, Husky
- **テスト**: Jest, Cypress, Playwright
- **CI/CD**: GitHub Actions, GitLab CI
- **モニタリング**: Sentry, LogRocket
- **AI開発支援**: Cursor, GitHub Copilot
- **ドキュメント**: Storybook, Swagger/OpenAPI

---

このガイドを使用してClaude Codeで効率的にボイラープレート環境を整備し、既存プロジェクトとの一貫性を保ちながら開発効率を向上させてください。
