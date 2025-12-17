module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    // Example custom rule overrides:
    "react/react-in-jsx-scope": "off", // for React 17+
    "no-unused-vars": "warn",
    "@typescript-eslint/no-unused-vars": ["warn"],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
