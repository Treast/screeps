import { ErrorMapper } from "utils/ErrorMapper";
import { UnitManager } from "managers/unit.manager";

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  //console.log(`Current game tick is ${Game.time}`);
  let unitManager = new UnitManager();

  const cpu: number = Game.cpu.getUsed();

  unitManager.initiliaze();
  unitManager.create();
  unitManager.work();

  console.log(`********************************`);
  console.log(`Turn ${Game.time} complete (CPU usage: ${(Game.cpu.getUsed() - cpu).toFixed(3)})`);
  console.log(`********************************`);
});
