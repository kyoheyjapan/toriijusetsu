/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './src/**/*.module.css', // CSSモジュールを使用している場合
  ],
  safelist: [
    {
      pattern:
        /^(bg-(?:gray|red|orange|yellow|green|blue|pink)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(text-(?:gray|red|orange|yellow|green|blue|pink)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(border-(?:gray|red|orange|yellow|green|blue|pink)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(fill-(?:gray|red|orange|yellow|green|blue|pink)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
  ],
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
