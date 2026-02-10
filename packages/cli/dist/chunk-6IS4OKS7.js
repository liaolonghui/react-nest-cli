import {
  prompts_config_default
} from "./chunk-PMB2T2TP.js";

// packages/cli/src/commands/base/init.ts
import prompts from "prompts";
import consola from "consola";
import fsExtra from "fs-extra";
import path from "path";
import { cwd } from "process";
import { downloadTemplate } from "giget";
import ora from "ora";
function init(program) {
  program.command("init").description("\u521D\u59CB\u5316\u9879\u76EE").argument("[project-name]", "\u9879\u76EE\u540D\u79F0").option("--template <template-name>", "\u9879\u76EE\u6A21\u677F\u540D\u79F0").action(async (projectName, rest) => {
    let { template } = rest || {};
    if (!projectName) {
      const response = await prompts({
        type: "text",
        initial: "my-project",
        // 默认值
        name: "projectName",
        message: "\u8BF7\u8F93\u5165\u9879\u76EE\u540D\u79F0"
        // validate: value => value.length ? true : '请输入项目名称'
      });
      projectName = response.projectName;
    }
    const noTemplate = template && !prompts_config_default.templates.find((item) => item.value === template);
    if (!template || noTemplate) {
      if (noTemplate) {
        consola.error(`\u9879\u76EE\u6A21\u677F ${template} \u4E0D\u5B58\u5728, \u8BF7\u9009\u62E9\u5176\u4ED6\u6A21\u677F`);
      }
      const response = await prompts({
        type: "select",
        name: "template",
        message: "\u8BF7\u9009\u62E9\u9879\u76EE\u6A21\u677F",
        choices: prompts_config_default.templates,
        initial: 0
        // 默认选择第一个
      });
      template = response.template;
    }
    const tip = `\u521D\u59CB\u5316\u9879\u76EE ${projectName}\uFF0C\u6A21\u677F ${template}`;
    const spinner = ora({
      text: tip,
      color: "blue"
      // spinner: 'growVertical',
      // isEnabled: false
    });
    spinner.start();
    const projectDir = path.resolve(cwd(), projectName);
    if (fsExtra.existsSync(projectDir)) {
      spinner.fail(`\u{1F4A5}\u521D\u59CB\u5316\u5931\u8D25: \u9879\u76EE\u76EE\u5F55 ${projectName} \u5DF2\u5B58\u5728`);
      return;
    }
    const res = await downloadTemplate(
      `github:liaolonghui/react-nest-cli/packages/templates/${template}#main`,
      {
        dir: projectDir
      }
    );
    const { dir } = res;
    spinner.succeed(`\u9879\u76EE\u521D\u59CB\u5316\u6210\u529F\uFF0C\u9879\u76EE\u76EE\u5F55\uFF1A${dir}`);
  });
}

export {
  init
};
//# sourceMappingURL=chunk-6IS4OKS7.js.map