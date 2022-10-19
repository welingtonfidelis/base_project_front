import { LoggedUser } from "../../domains/user";

export type State = { user: LoggedUser };

export type Action = {
  updateUser: (data: Partial<LoggedUser>) => void;
  clearUser: () => void;
};
