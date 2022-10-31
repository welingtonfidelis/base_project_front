import { User } from "../../../../domains/user";

export interface UserFullDB extends Omit<User, 'id'> {
    id?: number;
    password: string;
}