// packages/cli/src/commands/base/initComponent.ts
import "commander";
import consola from "consola";
import fs from "fs";
import path from "path";
import { cwd } from "process";
import ora from "ora";
import prompts from "prompts";
var firstCharUpperCase = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
var ensureDir = (dir) => {
  return new Promise((resolve) => {
    fs.mkdir(dir, { recursive: true }, (err) => {
      if (err) {
        consola.error(`\u521B\u5EFA\u76EE\u5F55 ${dir} \u5931\u8D25`);
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
};
var existsPath = (path2) => {
  return new Promise((resolve) => {
    fs.stat(path2, (err) => {
      if (err) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
};
var safeSaveFile = async (path2, content, force = false) => {
  return new Promise((resolve, reject) => {
    existsPath(path2).then((exists) => {
      if (exists) {
        if (!force) {
          consola.error(`\u6587\u4EF6${path2} \u5DF2\u5B58\u5728`);
          reject(false);
          return;
        }
      } else {
        fs.writeFile(path2, content, "utf-8", (err) => {
          if (err) {
            consola.error(`\u6587\u4EF6${path2} \u5199\u5165\u5931\u8D25`);
            reject(false);
          } else {
            resolve(true);
          }
        });
      }
    }).catch(() => {
      reject(false);
    });
  });
};
var initComponent = (program) => {
  program.command("init:component").alias("init:c").alias("init:comp").argument("[component-name]", "\u7EC4\u4EF6\u540D\u79F0(\u5982Button\u3001Text\u3001Card)").description("\u521D\u59CB\u5316React\u7EC4\u4EF6 TSX + CSS").option("-d, --dir <dir>", "\u751F\u6210\u7EC4\u4EF6\u76EE\u5F55\uFF0C\u9ED8\u8BA4src/components", "src/components").option("-s, --style <style>", "\u4F7F\u7528\u54EA\u79CD\u6837\u5F0F\u65B9\u6848\uFF0C\u9ED8\u8BA4css", "css").option("-j, --jsx", "\u662F\u5426\u4F7F\u7528JSX\u6587\u4EF6\uFF0C\u9ED8\u8BA4TSX", false).option("-f, --force", "\u662F\u5426\u5F3A\u5236\u8986\u76D6\u5DF2\u5B58\u5728\u7EC4\u4EF6", false).action(async (componentName, rest) => {
    let { dir, style, jsx, force } = rest || {};
    if (!componentName) {
      const response = await prompts({
        type: "text",
        initial: "Button",
        // 默认值
        name: "componentName",
        message: "\u8BF7\u8F93\u5165\u7EC4\u4EF6\u540D\u79F0"
      });
      componentName = response.componentName;
    }
    if (!componentName || !componentName.trim()) {
      process.stderr.write("\u7EC4\u4EF6\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A\n");
      process.exit(1);
    }
    componentName = firstCharUpperCase(componentName);
    const inputComponentDir = path.join("apps/components", componentName);
    const outputComponentDir = path.resolve(cwd(), dir, componentName);
    const inputExists = await existsPath(inputComponentDir);
    if (!inputExists) {
      consola.error(`\u7EC4\u4EF6 ${componentName} \u4E0D\u5B58\u5728`);
      process.exit(1);
    }
    const tip = `\u521D\u59CB\u5316\u7EC4\u4EF6 ${componentName}`;
    const spinner = ora(tip).start();
    const dirExists = await ensureDir(outputComponentDir);
    if (!dirExists) {
      spinner.fail(`\u7EC4\u4EF6 ${componentName} \u521D\u59CB\u5316\u5931\u8D25, \u76EE\u5F55 ${outputComponentDir} \u521B\u5EFA\u5931\u8D25`);
      return;
    }
    let esFileExt = "tsx";
    let styleFileExt = "css";
    if (jsx) {
      esFileExt = "jsx";
    }
    if (style === "less") {
      styleFileExt = "less";
    }
    const esPath = path.resolve(outputComponentDir, `index.${esFileExt}`);
    const stylePath = path.resolve(outputComponentDir, `index.${styleFileExt}`);
    let esContent = fs.readFileSync(path.resolve(inputComponentDir, `index.${esFileExt}`), "utf-8");
    const styleContent = fs.readFileSync(path.resolve(inputComponentDir, `index.${styleFileExt}`), "utf-8");
    esContent = `import './index.${styleFileExt}';
${esContent}`;
    Promise.all([
      safeSaveFile(esPath, esContent, force),
      safeSaveFile(stylePath, styleContent, force)
    ]).then(() => {
      spinner.succeed(`\u7EC4\u4EF6 ${componentName} \u521D\u59CB\u5316\u6210\u529F, \u76EE\u5F55 ${outputComponentDir}`);
    }).catch(() => {
      spinner.fail(`\u7EC4\u4EF6 ${componentName} \u521D\u59CB\u5316\u5931\u8D25`);
    });
  });
};
var initComponent_default = initComponent;

export {
  initComponent_default
};
//# sourceMappingURL=chunk-B7N5IJK6.js.map