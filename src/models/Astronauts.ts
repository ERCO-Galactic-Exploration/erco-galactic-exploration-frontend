import { EMPTY_ASTRONAUT_SPECIALTY, IAstronautSpecialty } from "./AstronautSpecialties"
import { EMPTY_NATIONALITY, INationality } from "./Nationalities"

export interface IAstronaut {
    id_astronaut: number,
    name: string,
    id_specialty: IAstronautSpecialty,
    experience: number,
    id_nationality: INationality
}

export const EMPTY_ASTRONAUT: IAstronaut = {
    id_astronaut: 0,
    name: '',
    id_specialty: EMPTY_ASTRONAUT_SPECIALTY,
    experience: 0,
    id_nationality: EMPTY_NATIONALITY
}

