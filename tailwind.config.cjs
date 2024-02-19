/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        cog: ['Remington', 'American Typewriter'],
        toon: ['Impress', 'Comic Sans MS', 'Comic Sans', 'cursive'],
        minnie: ['Minnie', 'Impact'],
      },
      screens: {
        short: { raw: '(max-height: 800px)' },
      },
      boxShadow: {
        // shadow-[-1px_2px_4px_2px_rgba(0,0,0,0.5)]
        gag: '-1px 2px 4px 2px rgba(0,0,0,0.5)',
      },
      dropShadow: {
        box: '-5px 5px 5px rgba(0 0 0 / 0.5)',
      },
    },
  },
  plugins: [],
};
