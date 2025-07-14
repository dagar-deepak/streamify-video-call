import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: "coffee", // default
  setTheme: (theme) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("streamify-theme", theme);
    }
    set({ theme });
  },
  initializeTheme: () => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("streamify-theme");
      if (savedTheme) set({ theme: savedTheme });
    }
  },
}));
