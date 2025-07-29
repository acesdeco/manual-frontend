import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig, globalIgnores } from "eslint/config";
import reactHooks from "eslint-plugin-react-hooks";
import pluginRouter from "@tanstack/eslint-plugin-router";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  // @ts-expect-error this is recommended by the docs
  tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  pluginReact.configs.flat.recommended,
  reactHooks.configs["recommended-latest"],
  ...pluginRouter.configs["flat/recommended"],
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
      "no-restricted-syntax": "error",
      "no-console": ["warn", { allow: ["error"] }],
      "require-await": "error",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-deprecated": "warn",
    },
  },
  globalIgnores([
    "dist/",
    "note.*",
    "src/routeTree.gen.ts",
    ".tanstack",
    ".nitro",
    ".output",
  ]),
]);
