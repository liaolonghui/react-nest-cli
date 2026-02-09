// TypeScript version of the CSpell config.
// Requires Node.js >= 22.18 to run natively.
import { defineConfig } from 'cspell'

export default defineConfig({
    version: '0.2',
    dictionaryDefinitions: [
        {
            name: 'project-words',
            path: './.cspell/project-words.txt',
            addWords: true,
        },
    ],
    dictionaries: ['project-words'],
    ignorePaths: ['node_modules', './.cspell/project-words.txt'],
})
