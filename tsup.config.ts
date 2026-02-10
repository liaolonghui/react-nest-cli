import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['packages/cli/src'],
    outDir: 'packages/cli/dist',
    format: ['esm'], // ['esm', 'cjs', 'iife'],
    bundle: true,
    dts: true,
    sourcemap: true,
    clean: true,
    splitting: true,
    minify: false,
    outExtension() {
        return {
            js: `.js`,
        }
    },
})
