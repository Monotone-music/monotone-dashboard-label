import { create } from "zustand";

interface AccountStore {
  _id: string | null;
  showPopup: boolean;
  showDelete: boolean;
  showPopupDelete: boolean;
  setId: (_id: string | null) => void;
  idsToDelete: string[];
  setShowPopup: (showPopup: boolean) => void;
  setShowDelete: (showDelete: boolean) => void;
  setShowPopupDelete: (showPopupDelete: boolean) => void;
  setIdsToDelete: (ids: string[]) => void;
}

const useAccountStore = create<AccountStore>((set) => ({
  _id: null,
  showPopup: false,
  showDelete: false,
  showPopupDelete: false,
  setId: (_id) => set({ _id }),
  idsToDelete: [],
  setShowPopup: (showPopup) => set({ showPopup }),
  setShowDelete: (showDelete) => set({ showDelete }),
  setShowPopupDelete: (showPopupDelete) => set({showPopupDelete}),
  setIdsToDelete: (ids) => set({ idsToDelete: ids }),
}));

export default useAccountStore