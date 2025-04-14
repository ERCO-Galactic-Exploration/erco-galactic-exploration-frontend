import { create } from "zustand";
import { IMissionStatus } from "../models/MissionStatuses";
import { GETData } from "../services/WebServices";

interface MissionStatusStore {
    missionStatuses: IMissionStatus[];
    setMissionStatuses: (missionStatuses: IMissionStatus[]) => void;
    fetchMissionStatuses: () => Promise<void>;
}

export const useMissionStatusStore = create<MissionStatusStore>((set) => ({
    missionStatuses: [],

    setMissionStatuses: (missionStatuses) => set({ missionStatuses }),

    fetchMissionStatuses: async () => {
        try {
            const response = await GETData('/missions/statuses');
            set({ missionStatuses: response });
        } catch (error) {
            console.error("Error fetching mission statuses:", error);
        }
    },
}))