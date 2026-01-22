//  @ts-check

import { tanstackConfig } from "@tanstack/eslint-config"
import { defineConfig, globalIgnores } from "eslint/config"

export default defineConfig([
  ...tanstackConfig,
  {
    rules: {
      "react/react-in-jsx-scope": "off",
      "no-restricted-syntax": "error",
      "no-console": ["warn", { allow: ["error"] }],
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "error",
      "require-await": "off",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-deprecated": "warn",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/only-throw-error": [
        "error",
        {
          allow: ["Redirect"],
        },
      ],
      "import/consistent-type-specifier-style": "off",
      "@typescript-eslint/naming-convention": "off",
      "@typescript-eslint/no-unnecessary-condition": "off",
      "no-shadow": "off",
      "import/order": "off",
      "@typescript-eslint/require-await": "off",
    },
  },
  globalIgnores([
    "dist/",
    "note.*",
    "src/routeTree.gen.ts",
    ".tanstack",
    ".nitro",
    ".output",
    ".vercel",
    "node_modules",
  ]),
])
