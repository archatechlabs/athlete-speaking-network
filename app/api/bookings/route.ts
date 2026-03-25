import { NextResponse } from "next/server";
import { addBooking, listBookings } from "@/lib/mock/bookings-store";
import type { BookingPayload } from "@/lib/types";

function isBookingPayload(body: unknown): body is BookingPayload {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.athleteId === "string" &&
    typeof b.organizationName === "string" &&
    typeof b.eventType === "string" &&
    typeof b.date === "string" &&
    typeof b.budget === "string" &&
    typeof b.location === "string" &&
    typeof b.notes === "string"
  );
}

export async function GET() {
  return NextResponse.json({ bookings: listBookings() });
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    if (!isBookingPayload(body)) {
      return NextResponse.json(
        { error: "Invalid booking payload" },
        { status: 400 }
      );
    }
    const booking = addBooking(body);
    return NextResponse.json({ booking }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
