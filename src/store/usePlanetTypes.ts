import { create } from "zustand";
import { GETData } from "../services/WebServices";
import { IPlanetType } from "../models/PlanetTypes";

interface PlanetTypeStore {
    planetTypes: IPlanetType[];
    setPlanetTypes: (planetTypes: IPlanetType[]) => void;
    fetchPlanetTypes: () => Promise<void>;
}

export const usePlanetTypeStore = create<PlanetTypeStore>((set) => ({
    planetTypes: [],

    setPlanetTypes: (planetTypes) => set({ planetTypes }),

    fetchPlanetTypes: async () => {
        try {
            const response = await GETData('/planets/planet-types');
            set({ planetTypes: response });
        } catch (error) {
            console.error("Error fetching mission statuses:", error);
        }
    },
}))