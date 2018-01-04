import Constants from "./constants";

export class Config {
  public static readonly roles: Role[] = [
    {
      id: Constants.ROLE_HARVESTER,
      role: "Harvester",
      body: [WORK, MOVE, CARRY],
      numberMax: 2
    },
    {
      id: Constants.ROLE_BUILDER,
      role: "Builder",
      body: [WORK, MOVE, CARRY],
      numberMax: 2
    },
    {
      id: Constants.ROLE_UPGRADER,
      role: "Upgrader",
      body: [WORK, MOVE, CARRY],
      numberMax: 1
    }
  ];
};
