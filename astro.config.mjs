import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import { defineConfig } from 'astro/config';

const isProd = process.env.NODE_ENV === 'production';
export default defineConfig({
  site: 'https://boilerplate.com',
  base: isProd ? '/dist' : '/',
  // base: '/dist',
  base: '/',
  integrations: [
    react(),
    icon({
      include: {
        mdi: ['*'],
        lucide: ['*'],
        'fa-brands': ['*'],
      },
    }),
  ],
  vite: {
    plugins: [
      tailwindcss({
        config: './tailwind.config.js',
      }),
    ],
    resolve: {
      alias: {
        '@': '/src',
        '@images': '/src/images',
        '@components': '/src/components',
        '@layouts': '/src/layouts',
        '@data': '/src/data',
      },
    },
    build: {
      // 本番環境では圧縮を有効化
      minify: true,
      rollupOptions: {
        output: {
          // JSファイルの出力パス
          entryFileNames: 'assets/js/main.js',
          chunkFileNames: 'assets/js/chunk-[name].js',
          assetFileNames: (assetInfo) => {
            const name = assetInfo.name || '';
            // CSSファイルの場合
            if (name.endsWith('.css')) {
              return 'assets/css/[name].[hash].css';
            }
            // 画像やその他のアセット
            if (/\.(png|jpe?g|svg|gif|webp|avif)$/i.test(name)) {
              return 'assets/img/[name].[hash][extname]';
            }
            // フォントファイル
            if (/\.(woff2?|eot|ttf|otf)$/i.test(name)) {
              return 'assets/fonts/[name].[hash][extname]';
            }
            // その他のアセット
            return 'assets/img/[name].[hash][extname]';
          },
        },
      },
    },
  },
  // 実験的機能（必要に応じて）
  experimental: {
    preserveScriptOrder: true,
    headingIdCompat: true,
  },
});
