export class Creep {
    private name: string;
    private creep: Proto;
    private role: number;

    constructor(name: string) {
        this.name = name;
        this.creep = Game.creeps[name];

        if(this.creep.me)
    }

    public static create(spawn: StructureSpawn, name: string, role: Role): Creep? {
        if(spawn.canCreateCreep(role.body)) {
            const created = spawn.createCreep(role.body, name, { role: role.id });
            if(created === 0) return new Creep(name);
        }
        return null;
    }
}
