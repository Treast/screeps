import { Unit } from '../models/Unit';
import { Config } from '../config/config';

export class UnitManager {

    private units: Unit[];
    private spawn: StructureSpawn;

    public constructor() {
        this.units = [];
        this.spawn = Game.spawns[Config.spawn];
    }

    public initiliaze() {
        for(let name in Game.creeps) {
            this.units.push(new Unit(name));
        }
        console.log("Finished init");
    }

    public create() {
        for(let role of Config.roles) {
            const numberOfRole = _.sum(Game.creeps, creep => {
                return (creep.memory.role === role.code) ? 1 : 0;
            });

            if(numberOfRole < role.count) {
                let unit = Unit.create(this.spawn, role);
                if(unit) {
                    console.log(`Created an unit (${role.name}) named ${unit.name}`);
                    this.units.push(unit);
                }
            }
        }
        console.log("Finished create");
    }

    public work() {
        for(let unit of this.units) {
            unit.work();
        }
        console.log("Finished work");
    }
}
