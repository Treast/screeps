import { Config } from '../config/config';
import { Creep } from '../models/Creep';

export class CreepManager {
    public static initiliaze() {
        for(let name in Game.creeps) {
            let creep = Game.creeps[name];
            if(creep.memory.role == undefined) {
                for(let role of Config.roles) {
                    if(name.indexOf(role.role) > -1) creep.memory.role = role.id;
                }
            }
        }
    }
}
