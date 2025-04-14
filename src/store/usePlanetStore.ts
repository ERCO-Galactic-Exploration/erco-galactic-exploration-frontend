import { create } from "zustand";
import { EMPTY_PLANET, IPlanet } from "../models/Planets";

interface PlanetStore {
    planets: IPlanet[];
    selectedPlanet: IPlanet;
    setPlanets: (planets: IPlanet[]) => void;
    selectPlanet: (planets: IPlanet) => void;

}

export const usePlanetStore = create<PlanetStore>((set) => ({
    planets: [],

    selectedPlanet: EMPTY_PLANET,

    setPlanets: (planets) => set({ planets }),

    selectPlanet: (planets) => set({ selectedPlanet: planets }),
}))