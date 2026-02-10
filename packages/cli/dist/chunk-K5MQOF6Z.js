// packages/cli/src/commands/baseRegisterCommands.ts
function baseRegisterCommands(program) {
  return function registerCommand(fn) {
    fn(program);
  };
}
var baseRegisterCommands_default = baseRegisterCommands;

export {
  baseRegisterCommands_default
};
//# sourceMappingURL=chunk-K5MQOF6Z.js.map