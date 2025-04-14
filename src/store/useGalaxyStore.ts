import { create } from "zustand";
import { GETData } from "../services/WebServices";
import { IGalaxy } from "../models/Galaxies";

interface GalaxyStore {
    galaxies: IGalaxy[];
    setGalaxies: (galaxies: IGalaxy[]) => void;
    fetchGalaxies: () => Promise<void>;
}

export const useGalaxyStore = create<GalaxyStore>((set) => ({
    galaxies: [],

    setGalaxies: (galaxies) => set({ galaxies }),

    fetchGalaxies: async () => {
        try {
            const response = await GETData('/planets/galaxies');
            set({ galaxies: response });
        } catch (error) {
            console.error("Error fetching galaxies:", error);
        }
    },
}))