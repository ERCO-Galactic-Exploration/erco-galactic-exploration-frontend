import { create } from "zustand";
import { IPlanetaryScan } from "../models/PlanetaryScans";

interface PlanetaryScanStore {
    planetaryScans: IPlanetaryScan[];
    setPlanetaryScans: (planetaryScans: IPlanetaryScan[]) => void;
    // fetchMissionCrews: () => Promise<void>;
}

export const usePlanetaryScanStore = create<PlanetaryScanStore>((set) => ({
    planetaryScans: [],

    setPlanetaryScans: (planetaryScans) => set({ planetaryScans }),

    // fetchMissionCrews: async () => {
    //     try {
    //         const response = await GETData('/missions/statuses');
    //         set({ missionCrews: response });
    //     } catch (error) {
    //         console.error("Error fetching mission crews:", error);
    //     }
    // },
}))