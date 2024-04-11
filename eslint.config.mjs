import globals from "globals";

import path from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import pluginJs from "@eslint/js";

// eslint.config.js
import js from "@eslint/js";

// Permite o Eslint + Prettier
import eslintConfigPrettier from "eslint-config-prettier";

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: pluginJs.configs.recommended,
});

export default [
  {
    languageOptions: { globals: globals.browser },
  },
  ...compat.extends("airbnb"),
  // Permite o Eslint + Prettier
  eslintConfigPrettier,
  js.configs.recommended,
  {
    rules: {
      "no-console": ["error", { allow: ["log"] }],
      "no-param-reassign": ["error", { props: false }],
      "no-undef": ["error", { typeof: false }],
      "import/extensions": ["error", { js: "ignorePackages" }],
      "import/no-named-as-default": 0,
      "import/no-named-as-default-member": 0,
    },
  },
];
