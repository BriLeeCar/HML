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
		settings: {
			react: {
				version: 'detect', // You can add this if you get a warning about the React version when you lint

			},
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
		plugins: {
			'@next/next': nextPlugin,
		},
		rules: {
			...nextPlugin.configs.recommended.rules,
			...nextPlugin.configs['core-web-vitals'].rules,
		},
	},
	{
		ignores: ['.next/*', 'next-env.d.ts', 'src/app/admin/data-collection/_components/**'],
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
			"@typescript-eslint/no-explicit-any": "off",
			'@typescript-eslint/no-unused-vars': "off"
		},
	},
]);


/* 
import { FlatCompat } from '@eslint/eslintrc'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
	baseDirectory: __dirname,
})

const eslintConfig = [
	...compat.extends('next/core-web-vitals', 'next/typescript'),
	{
		rules: {
			'@typescript-eslint/ban-ts-comment': 'warn',
			'@typescript-eslint/no-empty-object-type': 'warn',
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					vars: 'all',
					args: 'after-used',
					ignoreRestSiblings: false,
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					destructuredArrayIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^(_|ignore)',
				},
			],
		},
	},
	{
		ignores: ['.next/'],
	},
]

export default eslintConfig

*/