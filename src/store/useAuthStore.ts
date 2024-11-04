import { AuthState } from "@/interface/AuthState";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (userData) => set({ user: userData.user, token: userData.token }),
      logout: () => set({ user: null, token: null }),
    }),
    { name: "auth-storage" }  // Key for localStorage
  )
);


  export default useAuthStore;