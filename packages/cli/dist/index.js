#!/usr/bin/env node
import {
  baseRegisterCommands_default
} from "./chunk-K5MQOF6Z.js";
import {
  info,
  logInfo
} from "./chunk-2LOTRMC6.js";
import {
  init
} from "./chunk-6IS4OKS7.js";
import "./chunk-PMB2T2TP.js";
import {
  initComponent_default
} from "./chunk-B7N5IJK6.js";
import {
  version
} from "./chunk-YUGLQSSS.js";
import "./chunk-NCNZGYLV.js";

// packages/cli/src/index.ts
import { program } from "commander";

// packages/cli/package.json
var package_default = {
  name: "@react-nest/cli",
  version: "1.0.5",
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

// packages/cli/src/index.ts
program.version(package_default.version, "-V, --version", "\u8F93\u51FA\u7248\u672C\u53F7").helpOption("-h, --help", "\u8F93\u51FA\u5E2E\u52A9\u4FE1\u606F").description(package_default.description).action(() => logInfo(program));
var registerCommand = baseRegisterCommands_default(program);
registerCommand(info);
registerCommand(init);
registerCommand(initComponent_default);
registerCommand(version);
program.parse(process.argv);
//# sourceMappingURL=index.js.map