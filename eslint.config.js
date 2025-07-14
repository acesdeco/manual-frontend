import js from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginQuery from "@tanstack/eslint-plugin-query";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  reactHooks.configs["recommended-latest"],
  ...pluginQuery.configs["flat/recommended"],
  {
    settings: {
      react: {
        version: "19.1.0",
      },
    },
  },
  {
    rules: {
      "react/react-in-jsx-scope": "off",
      "no-console": "warn",
      "no-unused-vars": "error",
    },
  },
  globalIgnores([".nitro/", ".output/", ".tanstack/"]),
]);
