import create from "zustand";
import { State, Action } from "./types";

const initialUserState = {
  name: "",
  email: "",
  permissions: [],
};

export const userStore = create<State & Action>((set) => ({
  user: initialUserState,

  updateUser: (data) => set(() => {
    console.log('data: ', data);
    return ({ user: data })}
    ),
  clearUser: () => set(() => ({ user: initialUserState })),
}));
