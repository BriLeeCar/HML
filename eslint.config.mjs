import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import tseslint from 'typescript-eslint'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript")
];

const tslintConfig = tseslint.config(
  ...eslintConfig,
  tseslint.configs.recommended,
  {
    rules: {
      "no-unused-expresions": 0,
      "@typescript-eslint/no-unused-expressions": [2, {
        allowShortCircuit: true,
        allowTernary: true
      }]
    }
  }
)

export default tslintConfig;
