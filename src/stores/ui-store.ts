import { create } from "zustand";

type SidebarState = "expanded" | "collapsed";

interface PanelState {
  id: string;
  isOpen: boolean;
  size?: number;
}

interface UIState {
  sidebar: SidebarState;
  sidebarMobileOpen: boolean;
  commandBarOpen: boolean;
  panels: PanelState[];
  activeModal: string | null;
  activeSheet: string | null;

  setSidebar: (state: SidebarState) => void;
  toggleSidebar: () => void;
  setSidebarMobileOpen: (open: boolean) => void;
  openCommandBar: () => void;
  closeCommandBar: () => void;
  togglePanel: (id: string) => void;
  setPanelSize: (id: string, size: number) => void;
  openModal: (id: string) => void;
  closeModal: () => void;
  openSheet: (id: string) => void;
  closeSheet: () => void;
}

export const useUIStore = create<UIState>()((set) => ({
  sidebar: "expanded",
  sidebarMobileOpen: false,
  commandBarOpen: false,
  panels: [],
  activeModal: null,
  activeSheet: null,

  setSidebar: (state) => set({ sidebar: state }),
  toggleSidebar: () =>
    set((prev) => ({
      sidebar: prev.sidebar === "expanded" ? "collapsed" : "expanded",
    })),
  setSidebarMobileOpen: (open) => set({ sidebarMobileOpen: open }),
  openCommandBar: () => set({ commandBarOpen: true }),
  closeCommandBar: () => set({ commandBarOpen: false }),

  togglePanel: (id) =>
    set((prev) => {
      const existing = prev.panels.find((p) => p.id === id);
      if (existing) {
        return {
          panels: prev.panels.map((p) =>
            p.id === id ? { ...p, isOpen: !p.isOpen } : p,
          ),
        };
      }
      return { panels: [...prev.panels, { id, isOpen: true }] };
    }),

  setPanelSize: (id, size) =>
    set((prev) => ({
      panels: prev.panels.map((p) =>
        p.id === id ? { ...p, size } : p,
      ),
    })),

  openModal: (id) => set({ activeModal: id }),
  closeModal: () => set({ activeModal: null }),
  openSheet: (id) => set({ activeSheet: id }),
  closeSheet: () => set({ activeSheet: null }),
}));
