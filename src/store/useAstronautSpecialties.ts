import { create } from "zustand";
import { GETData } from "../services/WebServices";
import { IAstronautSpecialty } from "../models/AstronautSpecialties";

interface AstronautSpecialtyStore {
    astronautSpecialties: IAstronautSpecialty[];
    setAstronautSpecialties: (stronautSpecialties: IAstronautSpecialty[]) => void;
    fetchAstronautSpecialties: () => Promise<void>;
}

export const useAstronautSpecialtyStore = create<AstronautSpecialtyStore>((set) => ({
    astronautSpecialties: [],

    setAstronautSpecialties: (astronautSpecialties) => set({ astronautSpecialties }),

    fetchAstronautSpecialties: async () => {
        try {
            const response = await GETData('/astronauts/specialties');
            set({ astronautSpecialties: response });
        } catch (error) {
            console.error("Error fetching astronaut specialty:", error);
        }
    },
}))