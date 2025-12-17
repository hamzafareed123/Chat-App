import { create } from "zustand";

export const userAuthStore = create((set) => ({
  authUser: { name: "hamza", _id: 123, age: 34 },
  isLoggedIn: false,

  login: () =>
    set((state) => ({
      isLoggedIn: !state.isLoggedIn,
    })),
}));
