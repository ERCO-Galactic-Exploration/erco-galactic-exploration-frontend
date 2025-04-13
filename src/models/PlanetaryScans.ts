import { EMPTY_MISSION, IMission } from "./Missions"
import { EMPTY_PLANET, IPlanet } from "./Planets"

export interface IPlanetaryScan {
    id_planet: IPlanet,
    id_mission: IMission,
    scanning_date: Date,
    temperature: number,
    atmosphere: number,
    resources: number,
}

export const EMPTY_PLANETARY_SCAN: IPlanetaryScan = {
    id_planet: EMPTY_PLANET,
    id_mission: EMPTY_MISSION,
    scanning_date: new Date,
    temperature: 0,
    atmosphere: 0,
    resources: 0,
}