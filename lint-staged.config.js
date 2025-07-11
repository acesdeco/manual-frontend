// @ts-check

/** @type {import("lint-staged").Configuration} */
export default {
  "*.{js,jsx,ts,tsx}": [() => "tsc -b", "eslint --fix"],
  "*.{js,jsx,ts,tsx,md,html,css}": "prettier --write",
};
