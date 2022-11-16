import { Profile } from "../../domains/user";

export type State = { user: Profile };

export type Action = {
  updateUser: (data: Partial<Profile>) => void;
  clearUser: () => void;
};
