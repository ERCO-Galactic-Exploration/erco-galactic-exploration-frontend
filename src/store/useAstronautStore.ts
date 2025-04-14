import { create } from "zustand";
import { GETData } from "../services/WebServices";
import { IAstronaut } from "../models/Astronauts";

interface AstronautStore {
    astronauts: IAstronaut[];
    setAstronauts: (astronauts: IAstronaut[]) => void;
    fetchAstronauts: () => Promise<void>;
}

export const useAstronautStore = create<AstronautStore>((set) => ({
    astronauts: [],

    setAstronauts: (astronauts) => set({ astronauts }),

    fetchAstronauts: async () => {
        try {
            const response = await GETData('/astronauts')
            // const data = await response.json();
            set({ astronauts: response });
        } catch (error) {
            console.error("Error fetching rockets: ", error);
        }
    },
}))