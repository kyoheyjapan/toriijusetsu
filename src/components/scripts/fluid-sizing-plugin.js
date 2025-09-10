// fluid-sizing-plugin.js
const plugin = require('tailwindcss/plugin');

const fluidSizingPlugin = plugin.withOptions(
  (options = {}) => {
    return ({ matchUtilities, theme }) => {
      const config = {
        minViewport: 320, // 最小ビューポート幅（既存設定に合わせて調整）
        maxViewport: 1920, // 最大ビューポート幅（--container-5xl: 120remに合わせて）
        unit: 'px', // デフォルト単位
        enableRem: true, // 既存のrem使用に合わせて有効化
        ...options,
      };

      // 流体値の解析ユーティリティ
      const parseFluidValue = (value) => {
        // 構文: [min,max] または [min,max,minVw,maxVw]
        const cleanValue = value.replace(/^\[|\]$/g, '');
        const parts = cleanValue.split(',').map((v) => v.trim());

        if (parts.length < 2) {
          throw new Error('流体値には最低でもminとmaxの値が必要です');
        }

        const [minSize, maxSize, minVw = config.minViewport, maxVw = config.maxViewport] = parts;

        return {
          minSize: parseFloat(minSize),
          maxSize: parseFloat(maxSize),
          minViewport: parseFloat(minVw),
          maxViewport: parseFloat(maxVw),
          unit: extractUnit(minSize) || config.unit,
        };
      };

      // 流体サイズの数学的計算
      const getFluidSize = (minSize, maxSize, minVw, maxVw, unit = 'px') => {
        const slope = (maxSize - minSize) / (maxVw - minVw);
        const yIntercept = minSize - slope * minVw;

        return `clamp(${minSize}${unit}, ${yIntercept}${unit} + ${slope * 100}vw, ${maxSize}${unit})`;
      };

      // 単位抽出ユーティリティ
      const extractUnit = (value) => {
        const match = value.match(/([a-zA-Z%]+)$/);
        return match ? match[1] : 'px';
      };

      // バリデーション関数
      const validateFluidValue = (parsed) => {
        if (parsed.minSize >= parsed.maxSize) {
          throw new Error(
            `最小サイズ (${parsed.minSize}) は最大サイズ (${parsed.maxSize}) より小さい必要があります`,
          );
        }
        if (parsed.minViewport >= parsed.maxViewport) {
          throw new Error(
            `最小ビューポート (${parsed.minViewport}) は最大ビューポート (${parsed.maxViewport}) より小さい必要があります`,
          );
        }
      };

      // 流体幅ユーティリティの生成
      matchUtilities(
        {
          'fluid-w': (value) => {
            try {
              const parsed = parseFluidValue(value);
              validateFluidValue(parsed);

              return {
                width: getFluidSize(
                  parsed.minSize,
                  parsed.maxSize,
                  parsed.minViewport,
                  parsed.maxViewport,
                  parsed.unit,
                ),
              };
            } catch (error) {
              console.warn(`fluid-w-${value}: ${error.message}`);
              return {};
            }
          },
        },
        {
          values: theme('fluidSizes') || {},
          type: 'any',
        },
      );

      // 流体高さユーティリティの生成
      matchUtilities(
        {
          'fluid-h': (value) => {
            try {
              const parsed = parseFluidValue(value);
              validateFluidValue(parsed);

              return {
                height: getFluidSize(
                  parsed.minSize,
                  parsed.maxSize,
                  parsed.minViewport,
                  parsed.maxViewport,
                  parsed.unit,
                ),
              };
            } catch (error) {
              console.warn(`fluid-h-${value}: ${error.message}`);
              return {};
            }
          },
        },
        {
          values: theme('fluidSizes') || {},
          type: 'any',
        },
      );

      // 流体サイズ（幅・高さ同時）ユーティリティ
      matchUtilities(
        {
          'fluid-size': (value) => {
            try {
              const parsed = parseFluidValue(value);
              validateFluidValue(parsed);

              const fluidValue = getFluidSize(
                parsed.minSize,
                parsed.maxSize,
                parsed.minViewport,
                parsed.maxViewport,
                parsed.unit,
              );

              return {
                width: fluidValue,
                height: fluidValue,
              };
            } catch (error) {
              console.warn(`fluid-size-${value}: ${error.message}`);
              return {};
            }
          },
        },
        {
          values: theme('fluidSizes') || {},
          type: 'any',
        },
      );

      // 流体パディングユーティリティ
      matchUtilities(
        {
          'fluid-p': (value) => {
            try {
              const parsed = parseFluidValue(value);
              validateFluidValue(parsed);

              return {
                padding: getFluidSize(
                  parsed.minSize,
                  parsed.maxSize,
                  parsed.minViewport,
                  parsed.maxViewport,
                  parsed.unit,
                ),
              };
            } catch (error) {
              console.warn(`fluid-p-${value}: ${error.message}`);
              return {};
            }
          },
        },
        {
          values: theme('fluidSizes') || {},
          type: 'any',
        },
      );

      // 流体パディング（個別方向）ユーティリティ
      matchUtilities(
        {
          'fluid-pt': (value) => {
            try {
              const parsed = parseFluidValue(value);
              validateFluidValue(parsed);

              return {
                paddingTop: getFluidSize(
                  parsed.minSize,
                  parsed.maxSize,
                  parsed.minViewport,
                  parsed.maxViewport,
                  parsed.unit,
                ),
              };
            } catch (error) {
              console.warn(`fluid-pt-${value}: ${error.message}`);
              return {};
            }
          },
        },
        {
          values: theme('fluidSizes') || {},
          type: 'any',
        },
      );

      matchUtilities(
        {
          'fluid-pb': (value) => {
            try {
              const parsed = parseFluidValue(value);
              validateFluidValue(parsed);

              return {
                paddingBottom: getFluidSize(
                  parsed.minSize,
                  parsed.maxSize,
                  parsed.minViewport,
                  parsed.maxViewport,
                  parsed.unit,
                ),
              };
            } catch (error) {
              console.warn(`fluid-pb-${value}: ${error.message}`);
              return {};
            }
          },
        },
        {
          values: theme('fluidSizes') || {},
          type: 'any',
        },
      );

      matchUtilities(
        {
          'fluid-pl': (value) => {
            try {
              const parsed = parseFluidValue(value);
              validateFluidValue(parsed);

              return {
                paddingLeft: getFluidSize(
                  parsed.minSize,
                  parsed.maxSize,
                  parsed.minViewport,
                  parsed.maxViewport,
                  parsed.unit,
                ),
              };
            } catch (error) {
              console.warn(`fluid-pl-${value}: ${error.message}`);
              return {};
            }
          },
        },
        {
          values: theme('fluidSizes') || {},
          type: 'any',
        },
      );

      matchUtilities(
        {
          'fluid-pr': (value) => {
            try {
              const parsed = parseFluidValue(value);
              validateFluidValue(parsed);

              return {
                paddingRight: getFluidSize(
                  parsed.minSize,
                  parsed.maxSize,
                  parsed.minViewport,
                  parsed.maxViewport,
                  parsed.unit,
                ),
              };
            } catch (error) {
              console.warn(`fluid-pr-${value}: ${error.message}`);
              return {};
            }
          },
        },
        {
          values: theme('fluidSizes') || {},
          type: 'any',
        },
      );

      matchUtilities(
        {
          'fluid-px': (value) => {
            try {
              const parsed = parseFluidValue(value);
              validateFluidValue(parsed);

              const fluidValue = getFluidSize(
                parsed.minSize,
                parsed.maxSize,
                parsed.minViewport,
                parsed.maxViewport,
                parsed.unit,
              );

              return {
                paddingLeft: fluidValue,
                paddingRight: fluidValue,
              };
            } catch (error) {
              console.warn(`fluid-px-${value}: ${error.message}`);
              return {};
            }
          },
        },
        {
          values: theme('fluidSizes') || {},
          type: 'any',
        },
      );

      matchUtilities(
        {
          'fluid-py': (value) => {
            try {
              const parsed = parseFluidValue(value);
              validateFluidValue(parsed);

              const fluidValue = getFluidSize(
                parsed.minSize,
                parsed.maxSize,
                parsed.minViewport,
                parsed.maxViewport,
                parsed.unit,
              );

              return {
                paddingTop: fluidValue,
                paddingBottom: fluidValue,
              };
            } catch (error) {
              console.warn(`fluid-py-${value}: ${error.message}`);
              return {};
            }
          },
        },
        {
          values: theme('fluidSizes') || {},
          type: 'any',
        },
      );

      // 流体マージンユーティリティ
      matchUtilities(
        {
          'fluid-m': (value) => {
            try {
              const parsed = parseFluidValue(value);
              validateFluidValue(parsed);

              return {
                margin: getFluidSize(
                  parsed.minSize,
                  parsed.maxSize,
                  parsed.minViewport,
                  parsed.maxViewport,
                  parsed.unit,
                ),
              };
            } catch (error) {
              console.warn(`fluid-m-${value}: ${error.message}`);
              return {};
            }
          },
        },
        {
          values: theme('fluidSizes') || {},
          type: 'any',
        },
      );

      // 流体マージン（個別方向）ユーティリティ
      matchUtilities(
        {
          'fluid-mt': (value) => {
            try {
              const parsed = parseFluidValue(value);
              validateFluidValue(parsed);

              return {
                marginTop: getFluidSize(
                  parsed.minSize,
                  parsed.maxSize,
                  parsed.minViewport,
                  parsed.maxViewport,
                  parsed.unit,
                ),
              };
            } catch (error) {
              console.warn(`fluid-mt-${value}: ${error.message}`);
              return {};
            }
          },
        },
        {
          values: theme('fluidSizes') || {},
          type: 'any',
        },
      );

      matchUtilities(
        {
          'fluid-mb': (value) => {
            try {
              const parsed = parseFluidValue(value);
              validateFluidValue(parsed);

              return {
                marginBottom: getFluidSize(
                  parsed.minSize,
                  parsed.maxSize,
                  parsed.minViewport,
                  parsed.maxViewport,
                  parsed.unit,
                ),
              };
            } catch (error) {
              console.warn(`fluid-mb-${value}: ${error.message}`);
              return {};
            }
          },
        },
        {
          values: theme('fluidSizes') || {},
          type: 'any',
        },
      );

      matchUtilities(
        {
          'fluid-ml': (value) => {
            try {
              const parsed = parseFluidValue(value);
              validateFluidValue(parsed);

              return {
                marginLeft: getFluidSize(
                  parsed.minSize,
                  parsed.maxSize,
                  parsed.minViewport,
                  parsed.maxViewport,
                  parsed.unit,
                ),
              };
            } catch (error) {
              console.warn(`fluid-ml-${value}: ${error.message}`);
              return {};
            }
          },
        },
        {
          values: theme('fluidSizes') || {},
          type: 'any',
        },
      );

      matchUtilities(
        {
          'fluid-mr': (value) => {
            try {
              const parsed = parseFluidValue(value);
              validateFluidValue(parsed);

              return {
                marginRight: getFluidSize(
                  parsed.minSize,
                  parsed.maxSize,
                  parsed.minViewport,
                  parsed.maxViewport,
                  parsed.unit,
                ),
              };
            } catch (error) {
              console.warn(`fluid-mr-${value}: ${error.message}`);
              return {};
            }
          },
        },
        {
          values: theme('fluidSizes') || {},
          type: 'any',
        },
      );

      matchUtilities(
        {
          'fluid-mx': (value) => {
            try {
              const parsed = parseFluidValue(value);
              validateFluidValue(parsed);

              const fluidValue = getFluidSize(
                parsed.minSize,
                parsed.maxSize,
                parsed.minViewport,
                parsed.maxViewport,
                parsed.unit,
              );

              return {
                marginLeft: fluidValue,
                marginRight: fluidValue,
              };
            } catch (error) {
              console.warn(`fluid-mx-${value}: ${error.message}`);
              return {};
            }
          },
        },
        {
          values: theme('fluidSizes') || {},
          type: 'any',
        },
      );

      matchUtilities(
        {
          'fluid-my': (value) => {
            try {
              const parsed = parseFluidValue(value);
              validateFluidValue(parsed);

              const fluidValue = getFluidSize(
                parsed.minSize,
                parsed.maxSize,
                parsed.minViewport,
                parsed.maxViewport,
                parsed.unit,
              );

              return {
                marginTop: fluidValue,
                marginBottom: fluidValue,
              };
            } catch (error) {
              console.warn(`fluid-my-${value}: ${error.message}`);
              return {};
            }
          },
        },
        {
          values: theme('fluidSizes') || {},
          type: 'any',
        },
      );

      // 流体フォントサイズユーティリティ
      matchUtilities(
        {
          'fluid-text': (value) => {
            try {
              const parsed = parseFluidValue(value);
              validateFluidValue(parsed);

              return {
                fontSize: getFluidSize(
                  parsed.minSize,
                  parsed.maxSize,
                  parsed.minViewport,
                  parsed.maxViewport,
                  parsed.unit,
                ),
              };
            } catch (error) {
              console.warn(`fluid-text-${value}: ${error.message}`);
              return {};
            }
          },
        },
        {
          values: theme('fluidSizes') || {},
          type: 'any',
        },
      );
    };
  },
  () => ({
    theme: {
      fluidSizes: {
        // 既存のコンテナサイズに対応
        'container-4xs': '[280px,280px]', // var(--container-4xs)
        'container-3xs': '[343px,343px]', // var(--container-3xs)
        'container-2xs': '[382px,382px]', // var(--container-2xs)
        'container-xs': '[576px,576px]', // var(--container-xs)
        'container-sm': '[704px,704px]', // var(--container-sm)
        'container-md': '[770px,770px]', // var(--container-md)
        'container-lg': '[960px,960px]', // var(--container-lg)
        'container-xl': '[1216px,1216px]', // var(--container-xl)
        'container-2xl': '[1320px,1320px]', // var(--container-2xl)
        'container-3xl': '[1440px,1440px]', // var(--container-3xl)
        'container-4xl': '[1536px,1536px]', // var(--container-4xl)
        'container-5xl': '[1920px,1920px]', // var(--container-5xl)

        // 基本的なサイズ展開
        xs: '[12px,18px]',
        sm: '[16px,24px]',
        md: '[24px,32px]',
        lg: '[32px,48px]',
        xl: '[48px,64px]',
        '2xl': '[64px,96px]',
        '3xl': '[96px,128px]',

        // スペーシングに対応した流体サイズ
        'spacing-xs': '[4px,8px]', // var(--spacing-xs) ベース
        'spacing-sm': '[8px,16px]', // var(--spacing-sm) ベース
        'spacing-md': '[16px,24px]', // var(--spacing-md) ベース
        'spacing-lg': '[24px,40px]', // var(--spacing-lg) ベース
        'spacing-xl': '[40px,64px]', // var(--spacing-xl) ベース
        'spacing-2xl': '[64px,104px]', // var(--spacing-2xl) ベース
        'spacing-3xl': '[104px,168px]', // var(--spacing-3xl) ベース

        // レスポンシブデザイン用の実用的なサイズ
        'hero-title': '[2rem,4rem]', // ヒーローセクションのタイトル
        'hero-subtitle': '[1.25rem,2rem]', // ヒーローセクションのサブタイトル
        'section-padding': '[2rem,4rem]', // セクションのパディング
        'card-padding': '[1rem,2rem]', // カードのパディング
        'button-padding': '[0.5rem,1rem]', // ボタンのパディング
      },
    },
  }),
);

module.exports = fluidSizingPlugin;
