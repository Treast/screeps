import { Constant } from './constants';

export const Config : Config = {
    spawn: 'Spawn1',
    roles: [
        {
            code: Constant.ROLE_BUILDER,
            name: "Builder",
            count: 2,
            body: [WORK, MOVE, MOVE, CARRY]
        },
        {
            code: Constant.ROLE_UPGRADER,
            name: "Upgrader",
            count: 3,
            body: [WORK, MOVE, MOVE, CARRY]
        },
        {
            code: Constant.ROLE_HARVESTER,
            name: "Harvester",
            count: 6,
            body: [WORK, MOVE, MOVE, CARRY]
        }
    ]
};
