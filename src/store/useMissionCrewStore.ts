import { create } from "zustand";
import { IMissionCrew } from "../models/MissionCrew";

interface MissionCrewStore {
    missionCrews: IMissionCrew[];
    setMissionCrews: (missionCrews: IMissionCrew[]) => void;
    // fetchMissionCrews: () => Promise<void>;
}

export const useMissionCrewStore = create<MissionCrewStore>((set) => ({
    missionCrews: [],

    setMissionCrews: (missionCrews) => set({ missionCrews }),

    // fetchMissionCrews: async () => {
    //     try {
    //         const response = await GETData('/missions/statuses');
    //         set({ missionCrews: response });
    //     } catch (error) {
    //         console.error("Error fetching mission crews:", error);
    //     }
    // },
}))