import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  email: string;
  role: "USER" | "SHELTER" | "ADMIN";
  nickname: string;
  profileUrl: string;
}

export interface UserDetailData {
  username: string;
  nickname: string;
  phoneNumber: string;
  address: string;
}

interface UserState {
  user: User | null;
  setUser: (u: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (u) => set({ user: u }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "hellopet-user",
    }
  )
);
