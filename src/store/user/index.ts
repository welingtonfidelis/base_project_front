import create from "zustand";
import { State, Action } from "./types";

const initialUserState = {
  id: 0, 
  username: '', 
  image_url: '', 
  image_key: '', 
  created_at: '', 
  name: "",
  email: "",
  is_blocked: false,
  permissions: [],
};

export const userStore = create<State & Action>((set) => ({
  user: initialUserState,

  updateUser: (data) =>
    set((state) => {
      return { user: { ...state.user, ...data } };
    }),
  clearUser: () => set(() => ({ user: initialUserState })),
}));
