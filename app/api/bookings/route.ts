import { NextResponse } from "next/server";
import { addBooking, listBookings } from "@/lib/mock/bookings-store";
import type { BookingPayload, ServiceKind } from "@/lib/types";

const SERVICE_KINDS: ServiceKind[] = [
  "speaking",
  "training",
  "mentoring",
  "appearance",
  "sponsorship",
  "consultation",
];

function isBookingPayload(body: unknown): body is BookingPayload {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  const v = b.virtualOrInPerson;
  return (
    typeof b.athleteId === "string" &&
    typeof b.athleteSlug === "string" &&
    typeof b.serviceType === "string" &&
    SERVICE_KINDS.includes(b.serviceType as ServiceKind) &&
    typeof b.organizationName === "string" &&
    typeof b.contactName === "string" &&
    typeof b.email === "string" &&
    typeof b.phone === "string" &&
    typeof b.eventType === "string" &&
    typeof b.date === "string" &&
    typeof b.location === "string" &&
    (v === "virtual" || v === "in-person" || v === "hybrid") &&
    typeof b.budget === "string" &&
    typeof b.audienceSize === "string" &&
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
