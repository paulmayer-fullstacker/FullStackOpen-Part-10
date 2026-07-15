// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const pluginJest = require("eslint-plugin-jest");
// Import the official ESLint 'globals' package
// This is the standard way to handle environment variables in flat configs.
const globals = require("globals");

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*"]
  },
  {
    files: ["**/*.test.js", "**/*.test.jsx", "**/*.spec.js", "**/*.spec.jsx"],
    languageOptions: {
      globals: {
        ...globals.jest
      }
    },
    plugins: {
      jest: pluginJest
    },
    rules: {
      ...pluginJest.configs["flat/recommended"].rules
    }
  }
]);
