import { EMPTY_ASTRONAUT, IAstronaut } from "./Astronauts";
import { EMPTY_MISSION, IMission } from "./Missions"

export interface IMissionCrew {
    mission: IMission,
    astronaut: IAstronaut
}

export const EMPTY_MISSION_CREW: IMissionCrew = {
    mission: EMPTY_MISSION,
    astronaut: EMPTY_ASTRONAUT
}