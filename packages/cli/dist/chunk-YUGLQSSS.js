import {
  text_config_default
} from "./chunk-NCNZGYLV.js";

// packages/cli/src/commands/base/version.ts
import consola from "consola";
import figlet from "figlet";
function version(program) {
  program.command("version").description("\u8F93\u51FA\u7248\u672C\u53F7").action(() => {
    consola.info(
      figlet.textSync(`version ==> ${program.version()}`, text_config_default)
    );
  });
}

export {
  version
};
//# sourceMappingURL=chunk-YUGLQSSS.js.map