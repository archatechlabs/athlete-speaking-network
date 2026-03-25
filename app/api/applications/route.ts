import { NextResponse } from "next/server";
import { addApplication, listApplications } from "@/lib/mock/applications-store";
import type { ApplicationPayload } from "@/lib/types";

function isApplicationPayload(body: unknown): body is ApplicationPayload {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  const keys = [
    "fullName",
    "email",
    "phone",
    "leagueSport",
    "yearsPlayed",
    "city",
    "servicesOffered",
    "topics",
    "bio",
    "socialLinks",
    "videoIntroUrl",
    "availability",
    "pricingRange",
  ] as const;
  return keys.every((k) => typeof b[k] === "string");
}

export async function GET() {
  return NextResponse.json({ applications: listApplications() });
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    if (!isApplicationPayload(body)) {
      return NextResponse.json(
        { error: "Invalid application payload" },
        { status: 400 }
      );
    }
    const application = addApplication(body);
    return NextResponse.json({ application }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
