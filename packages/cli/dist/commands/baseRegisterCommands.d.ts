import { Command } from 'commander'

declare function baseRegisterCommands(
    program: Command
): (fn: (program: Command) => void) => void

export { baseRegisterCommands as default }
