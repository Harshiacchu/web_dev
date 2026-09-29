// ESLint flat config for an ES6-module, browser-based project.
// Swap this for the class-provided config if required; the source is written
// to pass standard recommended rules with zero warnings.
import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    files: ["js/**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
      "prefer-const": "error",
      eqeqeq: ["error", "always"],
    },
  },
];
