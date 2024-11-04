import { create } from "zustand";

interface LoadingStore {
    loading: boolean;
    setLoading: (loading: boolean) => void;
  }
  
  const useLoadingStore = create<LoadingStore>((set) => ({
    loading: false,
    setLoading: (loading) => set({ loading }),
  }));
  
  export default useLoadingStore;