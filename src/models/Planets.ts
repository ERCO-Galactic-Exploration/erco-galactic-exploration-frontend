import { EMPTY_GALAXY, IGalaxy } from "./Galaxies"
import { EMPTY_PLANET_TYPE, IPlanetType } from "./PlanetTypes"
import { EMPTY_SOLAR_SYSTEM, ISolarSystem } from "./SolarSystems"

export interface IPlanet {
    id_planet: number,
    name: string,
    id_solar_system: ISolarSystem,
    id_galaxy: IGalaxy,
    distance: number,
    id_planet_type: IPlanetType,
}

export const EMPTY_PLANET: IPlanet = {
    id_planet: 0,
    name: '',
    id_solar_system: EMPTY_SOLAR_SYSTEM,
    id_galaxy: EMPTY_GALAXY,
    distance: 0,
    id_planet_type: EMPTY_PLANET_TYPE,
}