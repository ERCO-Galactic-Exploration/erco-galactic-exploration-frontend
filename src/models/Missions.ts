import { EMPTY_MISSION_STATUS, IMissionStatus } from "./MissionStatuses"
import { EMPTY_ROCKET, IRocket } from "./Rockets"

export interface IMission {
    id_mission: number,
    name: string    ,
    mission_status: IMissionStatus,
    rocket: IRocket,
    start_date: Date,
    end_date: Date | null
}

export const EMPTY_MISSION: IMission = {
    id_mission: 0,
    name: ''    ,
    mission_status: EMPTY_MISSION_STATUS,
    rocket: EMPTY_ROCKET,
    start_date: new Date,
    end_date: null
}