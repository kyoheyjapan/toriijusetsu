/**
 * @see https://prettier.io/docs/configuration
 * @type {import('prettier').Config}
 */
export default {
  plugins: [
    'prettier-plugin-astro',
    'prettier-plugin-css-order',
    'prettier-plugin-organize-imports',
  ],
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  bracketSameLine: false,
  jsxBracketSameLine: false,
  quoteProps: 'as-needed',
  jsxSingleQuote: false,
  trailingComma: 'all',
  bracketSpacing: true,
  arrowParens: 'always',
  proseWrap: 'preserve',
  htmlWhitespaceSensitivity: 'ignore',
  endOfLine: 'lf',
  embeddedLanguageFormatting: 'auto',
  importOrder: [
    '^(react/(.*)$)|^(react$)',
    '^(next/(.*)$)|^(next$)',
    '<THIRD_PARTY_MODULES>',
    '',
    '^types$',
    '^@local/(.*)$',
    '^@/config/(.*)$',
    '^@/lib/(.*)$',
    '^@/components/(.*)$',
    '^@/styles/(.*)$',
    '^[./]',
  ],
  // prettier-plugin-organize-imports
  organizeImportsSkipDestructiveCodeActions: true,
  tailwindStylesheet: './src/styles/global.css',

  overrides: [
    // prettier-plugin-astro
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
};
