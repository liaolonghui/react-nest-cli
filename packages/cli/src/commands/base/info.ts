import type { Command } from 'commander'
import consola from 'consola'
import figlet from 'figlet'
import picocolors from 'picocolors'
import textConfig from '../../configs/text.config.ts'

// 输出项目信息
export const logInfo = (program: Command) => {
    console.log(
        picocolors.yellow(figlet.textSync('React Nest CLI', textConfig))
    )
    consola.start(picocolors.yellow(program.description()))
    consola.info(picocolors.yellow(program.version()))
}

export default function info(program: Command) {
    // 输出项目信息
    program
        .command('info')
        .description('输出项目信息')
        .action(() => logInfo(program))
}
