import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['packages/cli/src/index.ts'],
    outDir: 'packages/cli/dist',
    format: ['esm'], // ['cjs']
    dts: true,
    sourcemap: true,
    clean: true,
    splitting: true,
    minify: false,
    outExtension() {
        return {
            js: '.js',
        }
    },
})
