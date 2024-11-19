import { AuthState } from "@/interface/AuthState";
import { create } from "zustand";

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  token: null,
  error: null,
  login: (token, user) =>
    set({ isAuthenticated: true, token, user, error: null }),
  logout: () => {
    localStorage.removeItem("authToken");
    set({ isAuthenticated: false, token: null, user: null, error: null });
  },
  setError: (error) => set({ error }),
}));

  export default useAuthStore;