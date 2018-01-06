type StorageType = StructureContainer | StructureSpawn | StructureExtension;

export class Storage {

    private static storages: Structure[];

    public static initialize() {
        Storage.storages = _.filter(Game.structures, (structure) => {
            return structure.structureType == STRUCTURE_CONTAINER ||
                   structure.structureType == STRUCTURE_EXTENSION ||
                   structure.structureType == STRUCTURE_SPAWN;
        });
    }

    public static store(creep: Creep, resource: ResourceConstant) {
        const closestStorage = Storage.findClosestNotFull(creep);
        if (closestStorage && creep.transfer(closestStorage, resource) == ERR_NOT_IN_RANGE) {
          creep.moveTo(closestStorage);
        }
    }

    public static withdraw(creep: Creep, resource: ResourceConstant) {
        const closestStorage = Storage.findClosestFull(creep);
        if (closestStorage && creep.withdraw(closestStorage, resource) == ERR_NOT_IN_RANGE) {
          creep.moveTo(closestStorage);
        }
    }

    public static findClosestNotFull(creep: Creep) {
        return creep.pos.findClosestByPath(Storage.storages, {
            filter: (structure: StorageType) => {
                return ((structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity) ||
                (structure.structureType == STRUCTURE_CONTAINER && _.sum(structure.store) < structure.storeCapacity);
            }
        });
    }

    public static findClosestFull(creep: Creep) {
        return creep.pos.findClosestByPath(Storage.storages, {
            filter: (structure: StorageType) => {
                return ((structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && structure.energy == structure.energyCapacity) ||
                (structure.structureType == STRUCTURE_CONTAINER && _.sum(structure.store) == structure.storeCapacity);
            }
        });
    }
}
