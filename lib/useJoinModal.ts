import { create } from "zustand";

interface JoinModalStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useJoinModal = create<JoinModalStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
