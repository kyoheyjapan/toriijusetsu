// @ts-check
import react from '@astrojs/react';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // TailwindCSS統合
  integrations: [react()],

  // 静的サイト生成モード
  output: 'static',

  // HTML圧縮を無効化
  compressHTML: false,

  // 出力先ディレクトリ
  outDir: './dist',

  // ビルド設定
  build: {
    // 出力ファイル形式
    format: 'file',

    // アセットディレクトリ名
    assets: 'assets',

    // CSSを外部ファイルとして出力
    inlineStylesheets: 'never',
  },

  // Viteの設定
  vite: {
    build: {
      // 圧縮を無効化
      minify: false,

      // CSS分割を無効化
      cssCodeSplit: false,

      // 小さいアセットもインライン化しない
      assetsInlineLimit: 0,

      rollupOptions: {
        output: {
          // JSファイルの固定名出力
          entryFileNames: 'cms/js/usr/aisakatouma/main.js',
          chunkFileNames: 'cms/js/usr/aisakatouma/chunk-[name].js',

          // コード分割を制限
          manualChunks: {},

          // アセットの固定名出力
          assetFileNames: (assetInfo) => {
            const name = assetInfo.name || '';
            if (name.endsWith('.css')) {
              return 'cms/css/usr/aisakatouma/styles.css';
            }
            if (/\.(png|jpe?g|gif|svg|webp|ico)$/.test(name)) {
              return 'cms/img/[name][extname]';
            }
            return 'cms/css/usr/aisakatouma/[name][extname]';
          },
        },
      },
    },

    // エイリアスを設定して、インポート時のパスを短くする
    resolve: {
      alias: {
        '@images': '/src/images',
      },
    },
  },

  // 実験的機能（必要に応じて）
  experimental: {
    // 現在有効な実験的機能のみを設定
  },
});
