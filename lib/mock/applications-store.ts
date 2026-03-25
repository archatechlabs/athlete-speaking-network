import type { ApplicationPayload } from "@/lib/types";
import { applicationsSeed, type ApplicationRecord } from "@/lib/data";

const globalForApps = globalThis as unknown as {
  __asnApplications?: ApplicationRecord[];
};

function getStore(): ApplicationRecord[] {
  if (!globalForApps.__asnApplications) {
    globalForApps.__asnApplications = [...applicationsSeed];
  }
  return globalForApps.__asnApplications;
}

export function listApplications(): ApplicationRecord[] {
  return [...getStore()].reverse();
}

export function addApplication(payload: ApplicationPayload): ApplicationRecord {
  const row: ApplicationRecord = {
    ...payload,
    id: `ap_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    submittedAt: new Date().toISOString(),
    status: "pending",
  };
  getStore().push(row);
  return row;
}
