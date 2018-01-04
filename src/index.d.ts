interface CreepMemory {
    role: number;
}

interface Config {
    roles: Object[];
}

interface Role {
    id: number;
    role: string;
    body: BodyPartConstant[];
    numberMax: number;
}

interface Creep {
    name: string;
    role: number;
}
