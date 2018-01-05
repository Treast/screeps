// type shim for nodejs' `require()` syntax
declare const require: (module: string) => any;

interface CreepMemory {
    role: number;
    working?: boolean;
}

interface Role {
    code: number;
    name: string;
    count: number;
    body: BodyPartConstant[];
}

interface Config {
    roles: Role[];
    spawn: string;
}

interface UnitManager {
    units: Unit[];
}

interface Unit {
    name: string;
    creep: Creep;
    role: number;
}
