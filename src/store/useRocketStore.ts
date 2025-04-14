import { create } from "zustand";
import { IRocket } from "../models/Rockets";
import { GETData } from "../services/WebServices";

interface RocketStore {
    rockets: IRocket[];
    setRockets: (rockets: IRocket[]) => void;
    fetchRockets: () => Promise<void>;
}

export const useRocketStore = create<RocketStore>((set) => ({
    rockets: [],

    setRockets: (rockets) => set({ rockets }),

    fetchRockets: async () => {
        try {
            const response = await GETData('/rockets')
            // const data = await response.json();
            set({ rockets: response });
        } catch (error) {
            console.error("Error fetching rockets: ", error);
        }
    },
}))