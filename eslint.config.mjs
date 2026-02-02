import { defineConfig } from "eslint/config";
import nextPlugin from '@next/eslint-plugin-next';
import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default defineConfig([
	{
		"ignores": ["node_modules/**", "src/migrations/**", "src/_drizzle/**", "@types/payload-types.d.ts"],
	},
	{
		plugins: {
			react: reactPlugin,
		},
		rules: {
			...reactPlugin.configs['jsx-runtime'].rules,
		},
	},
	{
		plugins: {
			['react-hooks']: hooksPlugin,
		},
		rules: {
			...hooksPlugin.configs.recommended.rules,
			"react-hooks/immutability": "warn"
		}
	},
	{
		files: ['**/*.ts', '**/*.tsx'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaFeatures: { modules: true },
				ecmaVersion: 'latest',
				project: './tsconfig.json',
			},
		},
		plugins: {
			'@typescript-eslint': ts,
			ts,
		},
		rules: {
			...ts.configs['eslint-recommended'].rules,
			...ts.configs['recommended'].rules,
			"@typescript-eslint/no-unused-expressions": ["error", { "allowShortCircuit": true, "allowTernary": true }],
			// "@typescript-eslint/no-explicit-any": "off",
			// '@typescript-eslint/no-unused-vars': "off"
		},
	},
	{
		ignores: ['.next/*', 'next-env.d.ts', 'src/app/admin/data-collection/_components/**', "node_modules/**", "src/migrations/**", "src/_drizzle/**", "@types/**"],
	},
]);

