module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {},
      {
        usePrettierrc: true,
      },
    ],
    'react/require-default-props': 0,
    'react/function-component-definition': 0,
    'import/prefer-default-export': 0,
    'no-plusplus': 0,
    //disable prop-types as we use TypeScript for type checking
    'react/prop-types': 0,
    //we will use TypeScript's types for component props instead
    'react/require-default-props': 0,
    //only .tsx files may have JSX
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    // disable destructuring props
    'react/destructuring-assignment': 0,
    // disable props spreading
    'react/jsx-props-no-spreading': 0,
    'react/react-in-jsx-scope': 0,
    // allow loops
    'no-restricted-syntax': 0,
    'jsx-a11y/label-has-associated-control': 0,
  },
};
