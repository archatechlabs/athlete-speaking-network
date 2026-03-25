import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    name: "Athlete Speaking Network API",
    version: "0.1.0",
    endpoints: {
      "GET /api": "This index",
      "GET /api/bookings": "List mock bookings (session store)",
      "POST /api/bookings": "Create a booking (JSON body: BookingPayload)",
    },
  });
}
