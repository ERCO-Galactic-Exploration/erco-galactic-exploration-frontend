import { EMPTY_ROCKET_MODEL, IRocketModel } from "./RocketModels";

export interface IRocket {
    id_rocket: number,
    name: string,
    id_model: IRocketModel,
    capacity: number,
    autonomty: number,
}

export const EMPTY_ROCKET: IRocket = {
    id_rocket: 0,
    name: '',
    id_model: EMPTY_ROCKET_MODEL,
    capacity: 0,
    autonomty: 0,
}