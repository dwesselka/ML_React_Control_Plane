export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  role: "admin" | "member" | "viewer";
  teams: string[];
  createdAt: string;
}

export interface Team {
  id: string;
  name: string;
  description: string | null;
  memberCount: number;
  role: "owner" | "admin" | "member";
  createdAt: string;
}

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  permissions: string[];
  lastUsedAt: string | null;
  expiresAt: string | null;
  createdAt: string;
}

export type SettingsTab =
  | "profile"
  | "organization"
  | "api-keys"
  | "notifications"
  | "billing"
  | "members";
