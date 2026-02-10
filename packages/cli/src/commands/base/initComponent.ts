import { type Command } from 'commander'
import consola from 'consola'
import fs from 'node:fs'
import path from 'node:path'
import { cwd } from 'node:process'
import ora from 'ora'
import prompts from 'prompts'

const firstCharUpperCase = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

// 确保目录存在
const ensureDir = (dir: string) => {
    return new Promise((resolve) => {
        fs.mkdir(dir, { recursive: true }, (err) => {
            if (err) {
                consola.error(`创建目录 ${dir} 失败`)
                resolve(false)
            } else {
                resolve(true)
            }
        })
    })
}

// 检查路径是否存在
const existsPath = (path: string) => {
    return new Promise((resolve) => {
        fs.stat(path, (err) => {
            // consola.log(err)
            if (err) {
                resolve(false)
            } else {
                resolve(true)
            }
        })
    })
}

const safeSaveFile = async (
    path: string,
    content: string,
    force: boolean = false
) => {
    return new Promise((resolve, reject) => {
        existsPath(path)
            .then((exists) => {
                if (exists) {
                    if (!force) {
                        consola.error(`文件${path} 已存在`)
                        reject(false)
                        return
                    }
                } else {
                    fs.writeFile(path, content, 'utf-8', (err) => {
                        if (err) {
                            consola.error(`文件${path} 写入失败`)
                            reject(false)
                        } else {
                            resolve(true)
                        }
                    })
                }
            })
            .catch(() => {
                reject(false)
            })
    })
}

const initComponent = (program: Command) => {
    program
        .command('init:component')
        .alias('init:c')
        .alias('init:comp')
        .argument('[component-name]', '组件名称(如Button、Text、Card)')
        .description('初始化React组件 TSX + CSS')
        .option(
            '-d, --dir <dir>',
            '生成组件目录，默认src/components',
            'src/components'
        )
        .option('-s, --style <style>', '使用哪种样式方案，默认css', 'css')
        .option('-j, --jsx', '是否使用JSX文件，默认TSX', false)
        .option('-f, --force', '是否强制覆盖已存在组件', false)
        .action(async (componentName, rest) => {
            const { dir, style, jsx, force } = rest || {}
            if (!componentName) {
                const response = await prompts({
                    type: 'text',
                    initial: 'Button', // 默认值
                    name: 'componentName',
                    message: '请输入组件名称',
                })
                componentName = response.componentName
            }
            if (!componentName || !componentName.trim()) {
                process.stderr.write('组件名称不能为空\n')
                process.exit(1)
            }

            componentName = firstCharUpperCase(componentName)

            // 组件目录
            const inputComponentDir = path.join(
                'apps/components',
                componentName
            )
            const outputComponentDir = path.resolve(cwd(), dir, componentName)

            const inputExists = await existsPath(inputComponentDir)
            // consola.log(inputExists)
            if (!inputExists) {
                consola.error(`组件 ${componentName} 不存在`)
                process.exit(1)
            }

            const tip = `初始化组件 ${componentName}`
            const spinner = ora(tip).start()

            // 初始化组件   确保输出组件目录存在
            const dirExists = await ensureDir(outputComponentDir)
            if (!dirExists) {
                spinner.fail(
                    `组件 ${componentName} 初始化失败, 目录 ${outputComponentDir} 创建失败`
                )
                return
            }

            let esFileExt = 'tsx'
            let styleFileExt = 'css'
            if (jsx) {
                esFileExt = 'jsx'
            }
            if (style === 'less') {
                styleFileExt = 'less'
            }

            const esPath = path.resolve(
                outputComponentDir,
                `index.${esFileExt}`
            )
            const stylePath = path.resolve(
                outputComponentDir,
                `index.${styleFileExt}`
            )
            let esContent = fs.readFileSync(
                path.resolve(inputComponentDir, `index.${esFileExt}`),
                'utf-8'
            )
            const styleContent = fs.readFileSync(
                path.resolve(inputComponentDir, `index.${styleFileExt}`),
                'utf-8'
            )
            // 需要手动给esContent导入对应的style文件
            esContent = `import './index.${styleFileExt}';\n${esContent}`

            Promise.all([
                safeSaveFile(esPath, esContent, force),
                safeSaveFile(stylePath, styleContent, force),
            ])
                .then(() => {
                    spinner.succeed(
                        `组件 ${componentName} 初始化成功, 目录 ${outputComponentDir}`
                    )
                })
                .catch(() => {
                    spinner.fail(`组件 ${componentName} 初始化失败`)
                })
        })
}

export default initComponent
