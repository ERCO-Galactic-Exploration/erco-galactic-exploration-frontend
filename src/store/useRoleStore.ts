// import { create } from "zustand";
// import { IRole } from "../models/Roles";

// interface RoleStore {
//     roles: IRole[];
    
//     fetchRoles: () => Promise<void>;
// }

// export const useRoleStore = create<RoleStore>((set) => ({
//     roles: [],

//     // setMissionStatuses: (missionStatuses) => set({ missionStatuses }),

//     fetchRoles: async () => {
//         try {
//             const response = await fetch(`${import.meta.env.VITE_URL_BACKEND}/roles`);
//             const data = await response.json();
//             set({ missionStatuses: data });
//         } catch (error) {
//             console.error("Error fetching mission statuses:", error);
//         }
//     },
// }))