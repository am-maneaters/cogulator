import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        short: { raw: '(max-height: 800px)' },
      },

      dropShadow: {
        box: '-5px 5px 5px rgba(0 0 0 / 0.5)',
      },
    },
  },
  plugins: [],
} satisfies Config;
