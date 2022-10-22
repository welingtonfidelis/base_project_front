import { User } from "../../../../domains/user";

export interface UserFullDB extends User {
    password: string;
}