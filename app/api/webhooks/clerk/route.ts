// app/api/webhooks/clerk/route.ts

import { Webhook } from "svix";
import { NextResponse } from "next/server";
import { db } from "@/configs/db";
import { usersTable } from "@/configs/schema";

export const runtime = "nodejs"; // REQUIRED

export async function POST(req: Request) {
  const payload = await req.text();

  const svix_id = req.headers.get("svix-id");
  const svix_timestamp = req.headers.get("svix-timestamp");
  const svix_signature = req.headers.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("Missing svix headers");
    return new NextResponse("Missing headers", { status: 400 });
  }

  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);

  let evt: any;
  try {
    evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("Signature verification failed:", err);
    return new NextResponse("Invalid signature", { status: 400 });
  }

  if (evt.type === "user.created") {
    const user = evt.data;

    try {
      await db.insert(usersTable).values({
        id: user.id,
        name: `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim(),
        email: user.email_addresses[0].email_address,
        plan: "free",
      });
    } catch (err) {
      console.error("DB insert error:", err);
      return new NextResponse("Database error", { status: 500 });
    }
  }

  return NextResponse.json({ success: true });
}
