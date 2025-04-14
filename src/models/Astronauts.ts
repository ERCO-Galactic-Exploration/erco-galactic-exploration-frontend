import { EMPTY_ASTRONAUT_SPECIALTY, IAstronautSpecialty } from "./AstronautSpecialties"
import { EMPTY_NATIONALITY, INationality } from "./Nationalities"

export interface IAstronaut {
    id_astronaut: number,
    name: string,
    specialty: IAstronautSpecialty,
    experience: number,
    nationality: INationality
}

export const EMPTY_ASTRONAUT: IAstronaut = {
    id_astronaut: 0,
    name: '',
    specialty: EMPTY_ASTRONAUT_SPECIALTY,
    experience: 0,
    nationality: EMPTY_NATIONALITY
}

