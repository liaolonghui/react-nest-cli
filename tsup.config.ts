import { defineConfig } from "tsup";


export default defineConfig({
    entry: ['packages/cli/src/index.ts'],
    format: ['esm'],
    dts: true,
    sourcemap: true,
    clean: true,
})