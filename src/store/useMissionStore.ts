import { create } from "zustand";
import { EMPTY_MISSION, IMission } from "../models/Missions";

interface MissionStore {
    missions: IMission[];
    selectedMission: IMission;
    setMissions: (missions: IMission[]) => void;
    selectMission: (mission: IMission) => void;

}

export const useMissionStore = create<MissionStore>((set) => ({
    missions: [],

    selectedMission: EMPTY_MISSION,

    setMissions: (missions) => set({ missions }),

    selectMission: (mission) => set({ selectedMission: mission }),
}))