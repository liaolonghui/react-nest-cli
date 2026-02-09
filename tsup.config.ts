import { defineConfig } from "tsup";


export default defineConfig({
    entry: ['packages/cli/src/index.ts'],
    outDir: 'packages/cli/dist',
    format: ['esm'],
    dts: true,
    sourcemap: true,
    clean: true,
})