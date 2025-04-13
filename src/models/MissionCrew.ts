import { EMPTY_ASTRONAUT, IAstronaut } from "./Astronauts";
import { EMPTY_MISSION, IMission } from "./Missions"

export interface IMissionCrew {
    id_mission: IMission,
    id_astronaut: IAstronaut
}

export const EMPTY_MISSION_CREW: IMissionCrew = {
    id_mission: EMPTY_MISSION,
    id_astronaut: EMPTY_ASTRONAUT
}