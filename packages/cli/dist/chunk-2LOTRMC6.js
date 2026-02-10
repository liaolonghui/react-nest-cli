import {
  text_config_default
} from "./chunk-NCNZGYLV.js";

// packages/cli/src/commands/base/info.ts
import consola from "consola";
import figlet from "figlet";
import picocolors from "picocolors";
var logInfo = (program) => {
  console.log(
    picocolors.yellow(figlet.textSync("React Nest CLI", text_config_default))
  );
  consola.start(picocolors.yellow(program.description()));
  consola.info(picocolors.yellow(program.version()));
};
function info(program) {
  program.command("info").description("\u8F93\u51FA\u9879\u76EE\u4FE1\u606F").action(() => logInfo(program));
}

export {
  logInfo,
  info
};
//# sourceMappingURL=chunk-2LOTRMC6.js.map