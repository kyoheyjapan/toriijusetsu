// eslint.config.mjs
import js from '@eslint/js';
import astro from 'eslint-plugin-astro';
import betterTailwindcss from 'eslint-plugin-better-tailwindcss';
import ts from 'typescript-eslint';

export default [
  {
    ignores: ['.astro/', 'dist/', 'node_modules/', '.history/'],
  },

  js.configs.recommended,
  ...ts.configs.recommended,
  ...ts.configs.stylistic,
  ...astro.configs.recommended,

  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astro.parser,
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
    },
  },

  {
    rules: {
      // TypeScriptで未使用変数は型チェックで検出されるため無効化
      '@typescript-eslint/no-unused-vars': 'off',
      // モジュール解決エラーを無視
      'import/no-unresolved': 'off',
    },
  },

  // better-tailwindcss plugin configuration
  // ESLintプラグイン：フォーマットとリンティングルールにより、よりクリーンで保守性の高いTailwind CSSの記述を支援します
  {
    plugins: {
      'better-tailwindcss': betterTailwindcss,
    },
    rules: {
      // === STYLISTIC RULES ===
      // これらのルールは、長いTailwindクラス文字列を自動的に複数行に分割し、論理的な順序で並べ替え/グループ化することで可読性を向上させることに重点を置いています。

      // Tailwindクラスに対して一貫した行折り返しを強制する（自動修正機能あり）
      // 長いクラス名を自動的に複数行に分割し、可読性を向上させる
      'better-tailwindcss/enforce-consistent-line-wrapping': 'warn',

      // テールウィンドクラスの順序を統一して適用（自動修正機能あり）
      // クラスを論理的な順序で並べ替え：レイアウト > ボックス > タイポグラフィ > ビジュアル > アニメーション
      'better-tailwindcss/enforce-consistent-class-order': 'warn',

      // 一貫した変数構文の強制
      // TailwindクラスにおけるCSS変数の使用を統一します
      'better-tailwindcss/enforce-consistent-variable-syntax': 'warn',

      // 重要修飾子の位置を統一する
      // !important 修飾子が常に同じ位置（先頭または末尾）に配置されることを保証する
      'better-tailwindcss/enforce-consistent-important-position': 'warn',

      // 短縮クラス名の強制
      // 可能な場合に短縮クラス名の使用を推奨（例: 'px-4 py-4' ではなく 'p-4'）
      'better-tailwindcss/enforce-shorthand-classes': 'warn',

      // 重複クラスの削除（自動修正機能あり）
      // 重複するクラス名を自動的に削除
      'better-tailwindcss/no-duplicate-classes': 'error',

      // 非推奨のクラスを削除
      // 非推奨のTailwind CSSクラスの使用を報告
      'better-tailwindcss/no-deprecated-classes': 'warn',

      // Tailwindクラス内の不要な空白を禁止（自動修正可能）
      // クラス名間の余分な空白を削除
      'better-tailwindcss/no-unnecessary-whitespace': 'error',

      // === 正しさのルール ===
      // これらのルールはベストプラクティスを適用し、潜在的な問題を検出します

      // tailwindcssに登録されていないクラスを報告
      // タイプミスを検出し、すべてのクラスが有効なTailwind CSSクラスであることを保証します
      // カスタムクラスが多数あるため警告レベルに変更
      'better-tailwindcss/no-unregistered-classes': 'warn',

      // スタイルが競合するクラスを報告する（TW3のみ）
      // 互いに上書きし合うクラスを検出する（例: 'text-red-500 text-blue-500'）
      'better-tailwindcss/no-conflicting-classes': 'warn',

      // 制限クラスを禁止する
      // 特定のクラスが使用されるのを制限できるようにします
      'better-tailwindcss/no-restricted-classes': 'off',
    },
    settings: {
      'better-tailwindcss': {
        // === TAILWIND 設定 ===
        // プラグインが Tailwind 設定を読み込む方法を設定します

        // TailwindCSS v4: @import ディレクティブを含むエントリ CSS ファイルへのパス
        // このファイルには通常、@import "tailwindcss" などが記述されています
        entryPoint: 'src/styles/global.css',

        // TailwindCSS v3: tailwind.config.js ファイルへのパス
        // カスタムテーマ、プラグイン、ユーティリティ設定の読み込みに使用されます
        tailwindConfig: 'tailwind.config.js',

        // === 検出対象 ===
        // プラグインがTailwindクラスを検索する場所を定義

        // Tailwindクラスをチェックする関数呼び出し
        // 主要なユーティリティライブラリとカスタム関数をサポート
        callees: [
          // === 現在使用中のライブラリ ===
          'clsx', // clsx library（プロジェクトで使用中）

          // === 未使用のライブラリ（必要に応じてコメントアウト解除） ===
          // 'classnames',     // classnames library
          // 'ctl',            // ctl library
          // 'cva',            // class-variance-authority
          // 'tv',             // tailwind-variants

          // === カスタム関数設定（使用する場合はコメントアウト解除） ===
          // { name: 'cn', group: 'emptyLine' },              // 空行グループ化付きカスタム cn 関数
          // { name: 'cva', group: 'emptyLine' },             // 空行グループ化付きクラス Variance Authority
          // { name: 'cx', group: 'newLine' },                // 改行グループ化付きカスタム cx 関数
          // { name: 'tv', group: 'never', printWidth: 80 },  // Tailwind Variants - 改行なし、80 文字制限
          // { name: 'tw', group: 'never' },                  // カスタム tw 関数 - 改行なし

          // === グローバルフォーマットオプション（必要に応じて有効化） ===
          // { classesPerLine: 1, group: 'emptyLine' },                           // 1行に1クラス、空行グループ付き
          // { group: 'newLine', preferSingleLine: true, printWidth: 120 },       // 新規行グループ、1行120文字までを優先
          // { group: 'newLine', preferSingleLine: true, printWidth: 80 }         // 新規行グループ、1行80文字までを優先
        ],

        // HTML/JSX attributes to check for Tailwind classes
        // プラグインがこれらの属性内のクラス値を解析します
        attributes: [
          'class', // 標準HTML class属性（Astroで使用中）
          'className', // React/JSX className属性（Reactコンポーネントで使用中）
          // 'ngClass',        // Angular ngClass directive（Angularを使用していない）
        ],

        // Template literal tags to check
        // styled-componentsライクなライブラリやカスタムテンプレートリテラル用
        tags: [
          // 'tw',             // Tagged template literal: tw`flex items-center`
          // 'css',            // CSS-in-JS: css`display: flex;` (if contains Tailwind classes)
          // 'styled',         // Styled-components: styled.div`...`
        ],

        // Custom regex patterns for advanced detection
        // Define custom patterns to detect Tailwind classes in unusual contexts
        classRegex: [
          // Object property patterns
          ['class:\\s*"([^"]*)"', 1], // { class: "flex items-center" }
          ['class:\\s*`([^`]*)`', 1], // { class: `flex items-center` }
          ['className:\\s*"([^"]*)"', 1], // { className: "flex items-center" }
          ['className:\\s*`([^`]*)`', 1], // { className: `flex items-center` }

          // Variable assignment patterns
          ['\\bclass(?:Name)?\\s*[:=]\\s*"([^"]*)"', 1], // const className = "flex items-center"
          ['\\bclass(?:Name)?\\s*[:=]\\s*`([^`]*)`', 1], // const className = `flex items-center`

          // Function parameter patterns
          ['\\bclasses?\\s*[:=]\\s*"([^"]*)"', 1], // function({ classes: "flex items-center" })
          ['\\bclasses?\\s*[:=]\\s*`([^`]*)`', 1], // function({ classes: `flex items-center` })
        ],

        // === ADVANCED OPTIONS ===

        // Experimental features (use with caution)
        // experimental: {
        //   // Enable detection in comments
        //   classInComments: false,
        //
        //   // Enable detection in string concatenations
        //   classInConcatenation: false,
        // },

        // Custom class groups for sorting
        // Define custom groups for class ordering
        // groups: [
        //   'layout',      // display, position, top, right, bottom, left, etc.
        //   'box',         // width, height, margin, padding, etc.
        //   'typography',  // font-family, font-size, text-align, etc.
        //   'visual',      // background, border, shadow, etc.
        //   'animation',   // transition, transform, animation, etc.
        // ],

        // Ignore patterns
        // Files or patterns to ignore
        // ignore: [
        //   '**/node_modules/**',
        //   '**/dist/**',
        //   '**/*.min.*',
        // ],
      },
    },
  },
];
