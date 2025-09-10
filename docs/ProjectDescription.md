# Astroを使った静的LPサイト構築の要件

## 目的

レガシーなサイト管理システム内に設置・公開するための静的HTMLとCSS/JSファイルの出力

## 主な要件

1. **インラインスクリプトの削減**
   - JavaScriptコードをできるだけインラインで記述せず、単一のJSファイルにまとめる
   - `<head>`タグ内で読み込む

2. **CSS管理**
   - TailwindCSSを使用
   - スタイルも単一のCSSファイルにまとめる

3. **出力HTMLの最適化**
   - bodyタグを含むすべての要素からhashされたクラス名（astro-XXXXX）を削除
   - クリーンなHTML出力を実現

4. **ビルド出力の設定**
   - ファイル名にハッシュを使用しない
   - 固定のファイル名でアセットを出力（main.js, styles.cssなど）
   - 画像やその他のアセットも適切なディレクトリに整理

## 実装方法

### astro.config.mjs の設定

```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  // TailwindCSS統合
  integrations: [tailwind()],

  // 静的サイト生成モード
  output: 'static',

  // スコープスタイルの戦略変更（data-astro-cid属性を削除）
  scopedStyleStrategy: 'where',

  // ビルド設定
  build: {
    // 出力先ディレクトリ
    outDir: './dist',

    // アセットディレクトリ名
    assets: 'assets',

    // CSSを外部ファイルとして出力
    inlineStylesheets: 'never',

    // Viteの設定
    vite: {
      build: {
        // CSS分割を無効化
        cssCodeSplit: false,

        // ハッシュを無効化する出力設定
        rollupOptions: {
          output: {
            // JSファイルの固定名出力
            entryFileNames: 'assets/js/main.js',

            // アセットの固定名出力
            assetFileNames: (assetInfo) => {
              const info = assetInfo.name.split('.');
              const ext = info.pop();

              if (ext === 'css') {
                return `assets/css/styles.${ext}`;
              }

              // その他アセットの振り分け（画像、フォントなど）
              // ...
            },

            // コード分割を無効化
            manualChunks: undefined,
          },
        },

        // 小さいアセットもインライン化しない
        assetsInlineLimit: 0,
      },
    },
  },
});
```

### ディレクトリ構造

```
src/
├── components/  # 共通コンポーネント
│   └── Header.astro
├── layouts/     # レイアウト
│   └── Layout.astro
├── scripts/     # JSファイル
│   └── main.js  # すべてのJSを集約
├── styles/      # スタイル
│   └── global.css
└── pages/       # ページ
    └── index.astro
```

### JavaScriptの実装方針

- 機能ごとに関数を作成して`main.js`に集約
- `DOMContentLoaded`イベントで初期化
- headタグ内でdefer属性を使って読み込む

### CSSの実装方針

- TailwindCSSのユーティリティクラスを使用
- グローバルスタイルで必要に応じてカスタマイズ
- `<style is:global>`タグを活用してAstroのスコープスタイルを上書き

## 出力後の統合方法

ビルド後、`dist`ディレクトリ内の静的ファイルをレガシーCMSに統合する：

1. HTMLの内容をCMSのテンプレートに配置
2. CSS/JSファイルをCMSの静的ファイル領域にアップロード
3. 画像などのアセットをCMSのメディアライブラリに登録
4. 必要に応じてパスを調整
