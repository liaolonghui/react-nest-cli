import type { Command } from 'commander'
import consola from 'consola'
import figlet from 'figlet'
import textConfig from '../../configs/text.config.ts'

export default function version(program: Command) {
    // 输出版本号
    program
        .command('version')
        .description('输出版本号')
        .action(() => {
            consola.info(
                figlet.textSync(`version ==> ${program.version()}`, textConfig)
            )
        })
}
