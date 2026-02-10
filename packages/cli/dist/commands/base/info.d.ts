import { Command } from 'commander'

declare const logInfo: (program: Command) => void
declare function info(program: Command): void

export { info as default, logInfo }
