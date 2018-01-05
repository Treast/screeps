import { Constant } from './constants';

export const Config : Config = {
    spawn: 'Spawn1',
    roles: [
        {
            code: Constant.ROLE_BUILDER,
            name: "Builder",
            count: 3,
            body: [WORK, WORK, MOVE, MOVE, CARRY]
        },
        {
            code: Constant.ROLE_UPGRADER,
            name: "Upgrader",
            count: 6,
            body: [WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY]
        },
        {
            code: Constant.ROLE_HARVESTER,
            name: "Harvester",
            count: 8,
            body: [WORK, WORK, MOVE, MOVE, CARRY]
        }
    ]
};
