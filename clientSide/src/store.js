import { create } from "zustand";

const useStore = create((set) => ({
  language: "en",
  setLanguage: () =>
    set((state) => ({
      language: state.language === "en" ? "np" : "en",
    })),
  sidebarOpen: false,
  toggleSidebar: () =>
    set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));

export default useStore;
