#!/usr/bin/env node
import { program } from 'commander'
import packageJson from '../package.json' with { type: 'json' }
import baseRegisterCommands from './commands/baseRegisterCommands.ts'
import info, { logInfo } from './commands/base/info.ts'
import version from './commands/base/version.ts'
import init from './commands/base/init.ts'
import initComponent from './commands/base/initComponent.ts'

// import.meta.dirname 指向当前文件所在目录
// process.cwd() 指向当前工作目录 （实际运行时目录，不是当前文件所在目录）
// const cwd = process.cwd();
// const dirname = import.meta.dirname;

program
    .version(packageJson.version, '-V, --version', '输出版本号')
    .helpOption('-h, --help', '输出帮助信息')
    // .help((str) => '帮助信息：\n' + str)
    .description(packageJson.description)
    .action(() => logInfo(program))

const registerCommand = baseRegisterCommands(program)
// 注册info命令
registerCommand(info)
// 初始化项目命令
registerCommand(init)
// 初始化组件命令
registerCommand(initComponent)
// 输出版本号命令
registerCommand(version)

program.parse(process.argv)
