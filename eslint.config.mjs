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
  {
    plugins: {
      'better-tailwindcss': betterTailwindcss,
    },
    rules: {
      // クラスの順序を統一して並べ替え：レイアウト > ボックス > タイポグラフィ > ビジュアル > アニメーション（自動修正機能あり）
      'better-tailwindcss/enforce-consistent-line-wrapping': 'warn',
      'better-tailwindcss/enforce-consistent-class-order': 'warn',
      'better-tailwindcss/enforce-consistent-variable-syntax': 'warn',
      'better-tailwindcss/enforce-consistent-important-position': 'warn',
      'better-tailwindcss/enforce-shorthand-classes': 'warn',
      'better-tailwindcss/no-duplicate-classes': 'error',
      'better-tailwindcss/no-deprecated-classes': 'warn',
      'better-tailwindcss/no-unnecessary-whitespace': 'error',
      'better-tailwindcss/no-unregistered-classes': 'warn',
      'better-tailwindcss/no-conflicting-classes': 'warn',
      'better-tailwindcss/no-restricted-classes': 'off',
    },
    settings: {
      'better-tailwindcss': {
        entryPoint: 'src/styles/global.css',
        tailwindConfig: 'tailwind.config.js',

        // グローバル設定
        classesPerLine: 2, // 1行に最大3クラス
        group: 'newLine', // 改行でグループ分け
        preferSingleLine: true, // 1行に1クラス
        callees: ['clsx'],
        attributes: [
          'class', // 標準HTML class属性（Astroで使用中）
          'className', // React/JSX className属性（Reactコンポーネントで使用中）
        ],
      },
    },
  },
];
