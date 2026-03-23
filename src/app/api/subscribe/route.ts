import { NextResponse } from "next/server";
import { createSubscriber, subscriberExists } from "@/lib/notion";

export async function POST(request: Request) {
  try {
    const { email, source, date } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Email invalid" }, { status: 400 });
    }

    const exists = await subscriberExists(email);
    if (exists) {
      return NextResponse.json({ success: true, message: "Already subscribed" });
    }

    await createSubscriber({ email, source: source || "website", date: date || new Date().toISOString() });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json({ error: "Failed to save subscription" }, { status: 500 });
  }
}
