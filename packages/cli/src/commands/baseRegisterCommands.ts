import type { Command } from 'commander'

function baseRegisterCommands(program: Command) {
    return function registerCommand(fn: (program: Command) => void) {
        fn(program)
    }
}

export default baseRegisterCommands
