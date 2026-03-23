import { NextResponse } from "next/server";
import { createContact } from "@/lib/notion";

export async function POST(request: Request) {
  try {
    const { email, message, source } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Email invalid" }, { status: 400 });
    }

    if (!message || message.trim().length < 10) {
      return NextResponse.json({ error: "Mesajul trebuie să aibă cel puțin 10 caractere" }, { status: 400 });
    }

    await createContact({
      email,
      message: message.trim(),
      source: source || "Contact Modal",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact creation error:", error);
    return NextResponse.json({ error: "Failed to save contact" }, { status: 500 });
  }
}
