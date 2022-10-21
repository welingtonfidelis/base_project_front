import { User } from "../../../../domains/user";

export interface UserDB extends User {
    password: string;
}