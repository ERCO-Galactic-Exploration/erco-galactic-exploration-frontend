import { EMPTY_MISSION, IMission } from "./Missions"
import { EMPTY_PLANET, IPlanet } from "./Planets"

export interface IPlanetaryScan {
    planet: IPlanet,
    mission: IMission,
    scanning_date: Date,
    temperature: number,
    atmosphere: number,
    resources: number,
}

export const EMPTY_PLANETARY_SCAN: IPlanetaryScan = {
    planet: EMPTY_PLANET,
    mission: EMPTY_MISSION,
    scanning_date: new Date,
    temperature: 0,
    atmosphere: 0,
    resources: 0,
}