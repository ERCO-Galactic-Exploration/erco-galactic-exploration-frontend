import { create } from "zustand";
import { GETData } from "../services/WebServices";
import { ISolarSystem } from "../models/SolarSystems";

interface SolarSystemStore {
    solarSystems: ISolarSystem[];
    setSolarSystems: (solarSystems: ISolarSystem[]) => void;
    fetchSolarSystems: () => Promise<void>;
}

export const useSolarSystemStore = create<SolarSystemStore>((set) => ({
    solarSystems: [],

    setSolarSystems: (solarSystems) => set({ solarSystems }),

    fetchSolarSystems: async () => {
        try {
            const response = await GETData('/planets/solar-systems');
            set({ solarSystems: response });
        } catch (error) {
            console.error("Error fetching solar systems:", error);
        }
    },
}))