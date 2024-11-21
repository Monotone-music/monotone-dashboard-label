import { AuthState } from "@/interface/AuthState";
import { create } from "zustand";
import { persist } from "zustand/middleware";
const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      errorMsg: null,
      isAuthenticated: false,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      setErrorMsg: (errorMsg) => set({errorMsg}), 
      logout: () => set({ user: null, token: null, isAuthenticated: false })
    }),
    { name: "authStorage" }  // Key for localStorage
  )
);
  export default useAuthStore;