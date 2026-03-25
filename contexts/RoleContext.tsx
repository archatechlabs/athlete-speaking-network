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

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<UserRole>("viewer");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as UserRole | null;
      if (
        stored === "organization" ||
        stored === "athlete" ||
        stored === "viewer"
      ) {
        setRoleState(stored);
      }
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
