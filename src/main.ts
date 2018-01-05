import { ErrorMapper } from "utils/ErrorMapper";
import { UnitManager } from "managers/unit.manager";

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  //console.log(`Current game tick is ${Game.time}`);
  let unitManager = new UnitManager();

  unitManager.initiliaze();
  unitManager.create();
  unitManager.work();
});
