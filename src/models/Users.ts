import { EMPTY_ROLE, IRole } from "./Roles";

export interface IUser {
    id_user: number,
    first_name: string,
    last_name_1: string,
    last_name_2: string,
    // password: string,
    email: string,
    id_role: IRole
}

export const EMPTY_USER: IUser = {
    id_user: 0,
    first_name: '',
    last_name_1: '',
    last_name_2: '',
    // password: '',
    email: '',
    id_role: EMPTY_ROLE
}