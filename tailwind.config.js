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
    },
  },
  plugins: [],
};
