import { create } from "zustand";

interface Notification {
  id: string;
  type: "info" | "success" | "warning" | "error";
  title: string;
  message?: string;
  timestamp: string;
  read: boolean;
}

interface AppState {
  isReady: boolean;
  isOnline: boolean;
  notifications: Notification[];
  unreadCount: number;

  setReady: (ready: boolean) => void;
  setOnline: (online: boolean) => void;
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  clearNotifications: () => void;
}

export const useAppStore = create<AppState>()((set) => ({
  isReady: false,
  isOnline: true,
  notifications: [],
  unreadCount: 0,

  setReady: (ready) => set({ isReady: ready }),
  setOnline: (online) => set({ isOnline: online }),

  addNotification: (notification) =>
    set((prev) => {
      const newNotification: Notification = {
        ...notification,
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        read: false,
      };
      return {
        notifications: [newNotification, ...prev.notifications].slice(0, 100),
        unreadCount: prev.unreadCount + 1,
      };
    }),

  markNotificationRead: (id) =>
    set((prev) => ({
      notifications: prev.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n,
      ),
      unreadCount: Math.max(0, prev.unreadCount - 1),
    })),

  markAllNotificationsRead: () =>
    set((prev) => ({
      notifications: prev.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    })),

  clearNotifications: () => set({ notifications: [], unreadCount: 0 }),
}));
