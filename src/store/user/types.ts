import { User } from "../../domains/user";

export type State = { user: User };

export type Action = {
  updateUser: (data: User) => void;
  clearUser: () => void;
};
