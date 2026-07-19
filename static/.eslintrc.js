// .eslintrc.js
module.exports = {
  root: true, // Stop ESLint from looking for a configuration file in parent folders
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser for TypeScript
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features (including optional chaining and nullish coalescing)
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
    // This is important for rules that require type information, like some from @typescript-eslint
    // It points to your tsconfig.json file.
    project: './tsconfig.json',
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
    // Add settings for eslint-plugin-import to resolve TypeScript paths
    'import/resolver': {
      typescript: {
        project: './tsconfig.json', // Path to your tsconfig.json
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  env: {
    browser: true, // Enables browser globals like window and document
    amd: true, // Enables require() and define() as global variables as per the amd spec.
    node: true, // Enables Node.js global variables and Node.js scoping.
  },
  extends: [
    'eslint:recommended', // Use the recommended rules from ESLint
    'plugin:react/recommended', // Use the recommended rules from eslint-plugin-react
    'plugin:react-hooks/recommended', // Use the recommended rules from eslint-plugin-react-hooks
    'plugin:jsx-a11y/recommended', // Accessibility rules for JSX
    'plugin:@typescript-eslint/recommended', // Use the recommended rules from @typescript-eslint/eslint-plugin
    'plugin:@typescript-eslint/recommended-requiring-type-checking', // Additional rules that require type information
    'plugin:import/recommended', // Recommended rules from eslint-plugin-import
    'plugin:import/typescript', // TypeScript-specific rules for eslint-plugin-import
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This should always be the last configuration in the extends array.
  ],
  rules: {
    // You can override or add specific rules here.
    // For optional chaining and nullish coalescing, the recommended configs usually handle them well.
    // However, you might want to enforce specific patterns or disallow certain uses.

    // Example: Disallow unnecessary optional chaining (e.g., `obj?.prop` when `obj` is guaranteed to exist)
    // This rule is part of `plugin:@typescript-eslint/recommended-requiring-type-checking`
    '@typescript-eslint/no-unnecessary-condition': 'warn',

    // Example: Ensure nullish coalescing is used correctly
    // This rule is also part of `plugin:@typescript-eslint/recommended-requiring-type-checking`
    '@typescript-eslint/prefer-nullish-coalescing': 'warn',

    // Other common rules you might want to adjust:
    'react/react-in-jsx-scope': 'off', // Not needed for React 17+ with new JSX transform
    'react/prop-types': 'off', // Not needed when using TypeScript for prop types
    'no-unused-vars': 'off', // Disable base ESLint no-unused-vars as @typescript-eslint/no-unused-vars is used
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Adjust as per your preference for explicit return types
    '@typescript-eslint/no-explicit-any': 'warn', // Warn about 'any' usage
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Warn about unused variables, ignore those starting with _

    // Enforce consistent import order for better readability
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        pathGroups: [
          {
            pattern: '@/**', // This pattern matches your alias in tsconfig.json
            group: 'internal',
          },
        ],
        'newlines-between': 'always', // Ensures a blank line between import groups
        alphabetize: {
          order: 'asc', // Sorts imports alphabetically within each group
          caseInsensitive: true,
        },
      },
    ],
  },
};
