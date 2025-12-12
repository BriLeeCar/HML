import { defineConfig } from "eslint/config";
import nextPlugin from '@next/eslint-plugin-next';
import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default defineConfig([
    {
        "ignores": ["node_modules/**", ".docs/**", "src/server/prisma/generated/**"],
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
        },
    },
]);