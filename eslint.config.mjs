import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import nx from '@nx/eslint-plugin';
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const compat = new FlatCompat({
    baseDirectory: dirname(fileURLToPath(import.meta.url)),
    recommendedConfig: js.configs.recommended,
});

export default [
    ...nx.configs['flat/base'],
    ...nx.configs['flat/typescript'],
    ...nx.configs['flat/javascript'],
    {
        ignores: ['**/dist'],
    },
    {
        files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
        rules: {
            '@nx/enforce-module-boundaries': [
                'error',
                {
                    enforceBuildableLibDependency: true,
                    allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
                    depConstraints: [
                        {
                            sourceTag: '*',
                            onlyDependOnLibsWithTags: ['*'],
                        },
                    ],
                },
            ],
        },
    },
    // {
    //     files: ['**/*.ts', '**/*.tsx', '**/*.cts', '**/*.mts', '**/*.js', '**/*.jsx', '**/*.cjs', '**/*.mjs'],
    //     // Override or add rules here
    //     rules: {},
    // },
    ...compat.extends('plugin:@nx/react-typescript'),
    {
        plugins: {
            '@nx': nx,
            'simple-import-sort': eslintPluginSimpleImportSort,
        },
    },
    {
        files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
        rules: {
            '@nx/enforce-module-boundaries': [
                'error',
                {
                    enforceBuildableLibDependency: true,
                    allow: ['@/**'],
                    depConstraints: [
                        {
                            sourceTag: '*',
                            onlyDependOnLibsWithTags: ['*'],
                        },
                    ],
                },
            ],
        },
    },
    ...compat
        .config({
            plugins: ['simple-import-sort'],
            extends: ['plugin:@nx/javascript', 'prettier'],
        })
        .map((config) => ({
            ...config,
            files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.cjs', '**/*.mjs'],
            rules: {
                ...config.rules,
                '@typescript-eslint/no-explicit-any': 'off',
                'max-len': 'off',
                'no-empty': [
                    'error',
                    {
                        allowEmptyCatch: true,
                    },
                ],
                'simple-import-sort/imports': [
                    'warn',
                    {
                        groups: [['^react'], ['^@emotion', '^@mui'], ['^@golf-reporting'], ['^@/', '^\\.\\.', '^\\.']],
                    },
                ],
                'simple-import-sort/exports': 'warn',
            },
            languageOptions: {
                // parserOptions: {
                //     project: './tsconfig(.*)?.json',
                // },
            },
        })),
    ...compat
        .config({
            extends: ['plugin:@nx/javascript', 'prettier'],
            env: {
                node: true,
            },
        })
        .map((config) => ({
            ...config,
            files: ['**/*.js', '**/*.jsx', '**/*.cjs', '**/*.mjs'],
            rules: {
                ...config.rules,
                '@typescript-eslint/no-var-requires': 'off',
            },
        })),
    ...compat
        .config({
            env: {
                jest: true,
            },
        })
        .map((config) => ({
            ...config,
            files: ['**/*.spec.ts', '**/*.spec.tsx', '**/*.spec.js', '**/*.spec.jsx'],
            rules: {
                ...config.rules,
            },
        })),
];
