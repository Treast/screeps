import { Constant } from '../config/constants';
import { Config } from '../config/config';

export class Unit {

    public readonly name: string;
    private creep: Creep;
    private role: number;

    public constructor(name: string) {
        this.name = name;
        this.creep = Game.creeps[name];
        this.role = this.creep.memory.role;
    }

    public static create(spawn: StructureSpawn, role: Role): Unit | null {
        const random = Math.floor(Math.random() * 100000 + 1);
        const name = `${role.name}${random}`;

        if(spawn.isActive() && spawn.spawnCreep(role.body, name, { dryRun: true }) === 0) {
            const result = spawn.spawnCreep(role.body, name, {
                memory: {
                    role: role.code
                }
            });
            return (result === 0) ? new Unit(name) : null;
        }
        return null;
    }

    public work() {
        if(this.creep.ticksToLive < 500) {
            console.log(`Renewing creep named ${this.name}`);
            const spawn = Game.spawns[Config.spawn];
            if(spawn.renewCreep(this.creep) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(spawn);
            }
        } else {
            switch(this.role) {
                case Constant.ROLE_HARVESTER: this.workHarvest(); break;
                case Constant.ROLE_UPGRADER: this.workUpgrade(); break;
                case Constant.ROLE_BUILDER: this.workBuild(); break;
            }
        }
    }

    private workHarvest() {
        if(this.creep.carry.energy < this.creep.carryCapacity) {
            const source = this.creep.pos.findClosestByPath(FIND_SOURCES);
            if(this.creep.harvest(source) == ERR_NOT_IN_RANGE)
                this.creep.moveTo(source);
        } else {
            const targets = this.creep.room.find(FIND_STRUCTURES, {
                filter: structure => {
                    return ((structure.structureType == STRUCTURE_EXTENSION) || (structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity);
                }
            });

            if(targets.length > 0) {
                if(this.creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    this.creep.moveTo(targets[0]);
                }
            }
        }
    }

    private workUpgrade() {
        const controller = this.creep.room.controller;
        if(controller) {
            if (this.creep.memory.working == undefined) this.creep.memory.working = false;

            if (this.creep.memory.working && this.creep.carry.energy == 0) {
                this.creep.memory.working = false;
            }

            if (!this.creep.memory.working && this.creep.carry.energy == this.creep.carryCapacity) {
                this.creep.memory.working = true;
            }

            if (this.creep.memory.working) {
                if (this.creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
                    this.creep.moveTo(controller);
                }
            } else {
                const spawn = Game.spawns[Config.spawn];
                if (this.creep.withdraw(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    this.creep.moveTo(spawn);
                }
            }
        }
    }

    private workBuild() {
        if(this.creep.memory.working == undefined) this.creep.memory.working = false;

        if (this.creep.memory.working && this.creep.carry.energy == 0) {
          this.creep.memory.working = false;
        }

        if (!this.creep.memory.working && this.creep.carry.energy == this.creep.carryCapacity) {
          this.creep.memory.working = true;
        }

        const targets = this.creep.room.find(FIND_CONSTRUCTION_SITES);
        if (targets.length > 0) {
            const spawn = Game.spawns[Config.spawn];
            if (this.creep.memory.working && this.creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(targets[0]);
            } else if (this.creep.withdraw(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(spawn);
            }
        }
    }
}