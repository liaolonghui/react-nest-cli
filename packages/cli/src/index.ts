#!/usr/bin/env node
import { program } from "commander";
import picocolors from "picocolors"; // 也可用chalk
import figlet from 'figlet';
import prompts from 'prompts'; // 也可用inquirer、手动readline等
import consola from "consola";
import ora from 'ora';
import { downloadTemplate } from 'giget';
import path from 'node:path';
import fsExtra from 'fs-extra';
import textConfig from './configs/text.config.ts';
import promptsConfig from "./configs/prompts.config.ts";


// 输出项目信息
const logInfo = () => {
    console.info(picocolors.yellow(figlet.textSync('React Nest CLI', textConfig)))
    consola.start(picocolors.yellow(program.description()))
    consola.info(picocolors.yellow(program.version()))
}

const packageJsonPath = path.resolve(import.meta.dirname, '../../../package.json');
const packageJson = JSON.parse(fsExtra.readFileSync(packageJsonPath, 'utf-8'));

console.log(packageJsonPath, packageJson);

program
    .version(packageJson.version, '-V, --version', '输出版本号')
    .helpOption('-h, --help', '输出帮助信息')
    // .help((str) => '帮助信息：\n' + str)
    .description(packageJson.description)
    .action(logInfo);

// 输出项目信息
program
    .command('info')
    .description('输出项目信息')
    .action(logInfo);

// 初始化项目
program
    .command('init')
    .description('初始化项目')
    .argument('[project-name]', '项目名称')
    .option('--template <template-name>', '项目模板名称')
    .action(async (projectName, rest) => {
        let { template } = rest || {};
        // 如果projectName没有提供，让用户输入
        if (!projectName) {
            const response = await prompts({
                type: 'text',
                initial: 'my-project', // 默认值
                name: 'projectName',
                message: '请输入项目名称',
                // validate: value => value.length ? true : '请输入项目名称'
            });
            projectName = response.projectName;
        }

        // 如果template没有提供或者template不存在，让用户选择
        const noTemplate = (template && !promptsConfig.templates.find(item => item.value === template));
        if (!template || noTemplate) {
            if (noTemplate) {
                consola.error(`项目模板 ${template} 不存在, 请选择其他模板`);
            }
            const response = await prompts({
                type: 'select',
                name: 'template',
                message: '请选择项目模板',
                choices: promptsConfig.templates,
                initial: 0, // 默认选择第一个
            });
            template = response.template;
        }

        const tip = `初始化项目 ${projectName}，模板 ${template}`;
        const spinner = ora({
            text: tip,
            color: 'blue',
            // spinner: 'growVertical',
            // isEnabled: false
        });
        spinner.start();

        const projectDir = path.resolve(import.meta.dirname, projectName);
        if (fsExtra.existsSync(projectDir)) {
            spinner.fail(`💥初始化失败: 项目目录 ${projectName} 已存在`);
            return;
        }

        const res = await downloadTemplate(`github:liaolonghui/react-nest-cli/packages/templates/${template}#main`, {
            dir: projectDir,
        });
        const { dir } = res;
        spinner.succeed(`项目初始化成功，项目目录：${dir}`);
        // console.log(res);

    });

// 输出版本号
program.command('version')
    .description('输出版本号')
    .action(() => {
        // 全局option -V, --version 已被注册，这里无需再注册version命令，只是为了演示
        consola.info(figlet.textSync(`version ==> ${program.version()}`, textConfig));
    });

program.parse();