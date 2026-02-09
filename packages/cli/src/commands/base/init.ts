import type { Command } from 'commander'
import prompts from 'prompts'
import promptsConfig from '../../configs/prompts.config.ts'
import consola from 'consola'
import fsExtra from 'fs-extra'
import path from 'node:path'
import { cwd } from 'node:process'
import { downloadTemplate } from 'giget'
import ora from 'ora'

export default function init(program: Command) {
    program
        .command('init')
        .description('初始化项目')
        .argument('[project-name]', '项目名称')
        .option('--template <template-name>', '项目模板名称')
        .action(async (projectName, rest) => {
            let { template } = rest || {}
            // 如果projectName没有提供，让用户输入
            if (!projectName) {
                const response = await prompts({
                    type: 'text',
                    initial: 'my-project', // 默认值
                    name: 'projectName',
                    message: '请输入项目名称',
                    // validate: value => value.length ? true : '请输入项目名称'
                })
                projectName = response.projectName
            }

            // 如果template没有提供或者template不存在，让用户选择
            const noTemplate =
                template &&
                !promptsConfig.templates.find((item) => item.value === template)
            if (!template || noTemplate) {
                if (noTemplate) {
                    consola.error(`项目模板 ${template} 不存在, 请选择其他模板`)
                }
                const response = await prompts({
                    type: 'select',
                    name: 'template',
                    message: '请选择项目模板',
                    choices: promptsConfig.templates,
                    initial: 0, // 默认选择第一个
                })
                template = response.template
            }

            const tip = `初始化项目 ${projectName}，模板 ${template}`
            const spinner = ora({
                text: tip,
                color: 'blue',
                // spinner: 'growVertical',
                // isEnabled: false
            })
            spinner.start()

            const projectDir = path.resolve(cwd(), projectName)
            if (fsExtra.existsSync(projectDir)) {
                spinner.fail(`💥初始化失败: 项目目录 ${projectName} 已存在`)
                return
            }

            const res = await downloadTemplate(
                `github:liaolonghui/react-nest-cli/packages/templates/${template}#main`,
                {
                    dir: projectDir,
                }
            )
            const { dir } = res
            spinner.succeed(`项目初始化成功，项目目录：${dir}`)
            // console.log(res);
        })
}
