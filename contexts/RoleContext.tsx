"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { UserRole } from "@/lib/types";

const STORAGE_KEY = "asn_user_role";

type RoleContextValue = {
  role: UserRole;
  setRole: (role: UserRole) => void;
};

const RoleContext = createContext<RoleContextValue | null>(null);

function normalizeStoredRole(stored: string | null): UserRole | null {
  if (
    stored === "organization" ||
    stored === "athlete" ||
    stored === "subscriber" ||
    stored === "admin"
  ) {
    return stored;
  }
  if (stored === "viewer") {
    return "subscriber";
  }
  return null;
}

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<UserRole>("subscriber");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const next = normalizeStoredRole(stored);
      if (next) setRoleState(next);
    } catch {
      /* ignore */
    }
  }, []);

  const setRole = useCallback((next: UserRole) => {
    setRoleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(() => ({ role, setRole }), [role, setRole]);

  return (
    <RoleContext.Provider value={value}>{children}</RoleContext.Provider>
  );
}

export function useRole(): RoleContextValue {
  const ctx = useContext(RoleContext);
  if (!ctx) {
    throw new Error("useRole must be used within RoleProvider");
  }
  return ctx;
}
