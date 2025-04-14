import { EMPTY_GALAXY, IGalaxy } from "./Galaxies"
import { EMPTY_PLANET_TYPE, IPlanetType } from "./PlanetTypes"
import { EMPTY_SOLAR_SYSTEM, ISolarSystem } from "./SolarSystems"

export interface IPlanet {
    id_planet: number,
    name: string,
    solar_system: ISolarSystem,
    galaxy: IGalaxy,
    distance: number | null,
    planet_type: IPlanetType,
}

export const EMPTY_PLANET: IPlanet = {
    id_planet: 0,
    name: '',
    solar_system: EMPTY_SOLAR_SYSTEM,
    galaxy: EMPTY_GALAXY,
    distance: null,
    planet_type: EMPTY_PLANET_TYPE,
}