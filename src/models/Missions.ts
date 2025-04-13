import { EMPTY_MISSION_STATUS, IMissionStatus } from "./MissionStatuses"
import { EMPTY_ROCKET, IRocket } from "./Rockets"

export interface IMission {
    id_mission: number,
    name: string    ,
    id_mission_status: IMissionStatus,
    id_rocket: IRocket,
    start_date: Date,
    end_date: Date
}

export const EMPTY_MISSION: IMission = {
    id_mission: 0,
    name: ''    ,
    id_mission_status: EMPTY_MISSION_STATUS,
    id_rocket: EMPTY_ROCKET,
    start_date: new Date,
    end_date: new Date
}