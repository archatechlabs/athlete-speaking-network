import type { BookingPayload } from "@/lib/types";

export type StoredBooking = BookingPayload & {
  id: string;
  createdAt: string;
};

const globalForBookings = globalThis as unknown as {
  __asnBookings?: StoredBooking[];
};

function getStore(): StoredBooking[] {
  if (!globalForBookings.__asnBookings) {
    globalForBookings.__asnBookings = [];
  }
  return globalForBookings.__asnBookings;
}

export function listBookings(): StoredBooking[] {
  return [...getStore()].reverse();
}

export function addBooking(payload: BookingPayload): StoredBooking {
  const booking: StoredBooking = {
    ...payload,
    id: `bk_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
  };
  getStore().push(booking);
  return booking;
}
