#!/usr/bin/env node

// packages/cli/src/index.ts
import { program } from "commander";

// packages/cli/package.json
var package_default = {
  name: "@react-nest/cli",
  version: "1.0.4",
  description: "\u4E00\u4E2A\u811A\u624B\u67B6\u5DE5\u5177\uFF0C\u7528\u4E8E\u5FEB\u901F\u751F\u6210 react+nest \u9879\u76EE",
  main: "index.js",
  type: "module",
  scripts: {
    test: 'echo "Error: no test specified" && exit 1'
  },
  keywords: [],
  author: "",
  license: "ISC"
};

// packages/cli/src/commands/baseRegisterCommands.ts
function baseRegisterCommands(program2) {
  return function registerCommand2(fn) {
    fn(program2);
  };
}
var baseRegisterCommands_default = baseRegisterCommands;

// packages/cli/src/commands/base/info.ts
import consola from "consola";
import figlet from "figlet";
import picocolors from "picocolors";

// packages/cli/src/configs/text.config.ts
var text_config_default = {
  font: "Ghost",
  horizontalLayout: "default",
  verticalLayout: "default",
  width: 200,
  whitespaceBreak: true
};

// packages/cli/src/commands/base/info.ts
var logInfo = (program2) => {
  console.log(
    picocolors.yellow(figlet.textSync("React Nest CLI", text_config_default))
  );
  consola.start(picocolors.yellow(program2.description()));
  consola.info(picocolors.yellow(program2.version()));
};
function info(program2) {
  program2.command("info").description("\u8F93\u51FA\u9879\u76EE\u4FE1\u606F").action(() => logInfo(program2));
}

// packages/cli/src/commands/base/version.ts
import consola2 from "consola";
import figlet2 from "figlet";
function version(program2) {
  program2.command("version").description("\u8F93\u51FA\u7248\u672C\u53F7").action(() => {
    consola2.info(
      figlet2.textSync(`version ==> ${program2.version()}`, text_config_default)
    );
  });
}

// packages/cli/src/commands/base/init.ts
import prompts from "prompts";

// packages/cli/src/configs/prompts.config.ts
var prompts_config_default = {
  templates: [
    { title: "React + Nest", value: "react-nest", description: "\u8FD9\u4E2A\u6A21\u677F\u5305\u542B\u4E86 React + Nest \u9879\u76EE\u7684\u57FA\u672C\u914D\u7F6E", disabled: false },
    { title: "React + Nest + TypeScript", value: "react-nest-ts", description: "\u8FD9\u4E2A\u6A21\u677F\u5305\u542B\u4E86 React + Nest + TypeScript \u9879\u76EE\u7684\u57FA\u672C\u914D\u7F6E", disabled: false }
  ]
};

// packages/cli/src/commands/base/init.ts
import consola3 from "consola";
import fsExtra from "fs-extra";
import path from "path";
import { cwd } from "process";
import { downloadTemplate } from "giget";
import ora from "ora";
function init(program2) {
  program2.command("init").description("\u521D\u59CB\u5316\u9879\u76EE").argument("[project-name]", "\u9879\u76EE\u540D\u79F0").option("--template <template-name>", "\u9879\u76EE\u6A21\u677F\u540D\u79F0").action(async (projectName, rest) => {
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
        consola3.error(`\u9879\u76EE\u6A21\u677F ${template} \u4E0D\u5B58\u5728, \u8BF7\u9009\u62E9\u5176\u4ED6\u6A21\u677F`);
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

// packages/cli/src/index.ts
program.version(package_default.version, "-V, --version", "\u8F93\u51FA\u7248\u672C\u53F7").helpOption("-h, --help", "\u8F93\u51FA\u5E2E\u52A9\u4FE1\u606F").description(package_default.description).action(() => logInfo(program));
var registerCommand = baseRegisterCommands_default(program);
registerCommand(info);
registerCommand(init);
registerCommand(version);
program.parse();
//# sourceMappingURL=index.js.map