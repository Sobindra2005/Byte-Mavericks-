import { create } from "zustand";

const useStore = create((set) => ({
  language: "en",
  setLanguage: () =>
    set((state) => ({
      language: state.language === "en" ? "np" : "en",
    })),
}));

export default useStore;
