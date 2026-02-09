import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import { defineConfig } from 'eslint/config'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import prettier from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'

export default defineConfig([
    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
        ignores: [
            '**/dist/**',
            'node_modules/**',
            '**/*.config.ts',
            '**/packages/templates/**',
        ],
        plugins: {
            'simple-import-sort': simpleImportSort,
            prettier: prettier,
        },
        rules: {
            '@typescript-eslint/array-type': 'error',
            '@typescript-eslint/no-for-in-array': 'error',
            'no-undef': 'warn',
            'no-unused-vars': 'error',
            'no-console': 'warn',
            'prettier/prettier': 'error',
            ...prettierConfig.rules,

            // "simple-import-sort/imports": [
            //     "error",
            // ],
            // "simple-import-sort/exports": [
            //     "error",
            // ],
        },
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
            parser: tseslint.parser,
            parserOptions: {
                projects: ['eslint.config.ts', 'tsconfig.json'],
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    tseslint.configs.recommended,
])
