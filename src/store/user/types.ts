import { User } from "../../domains/user";

export type State = { user: User };

export type Action = {
  updateUser: (data: Partial<User>) => void;
  clearUser: () => void;
};
