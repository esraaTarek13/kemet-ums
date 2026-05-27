import { create } from "zustand";
import type { AuthStore } from "@/types";

/** The global auth store — state + actions. */
export const useAuthStore = create<AuthStore>((set) => ({
  // State
  user: null,
  isLoading: true,

  // Actions
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ isLoading: loading }),
  logout: () => set({ user: null }),
}));
