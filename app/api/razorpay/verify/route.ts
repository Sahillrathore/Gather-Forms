// app/api/razorpay/verify/route.ts
import crypto from "crypto";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { db } from "@/configs/db";
import { usersTable } from "@/configs/schema";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const {
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    plan
  } = await req.json();

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(body)
    .digest("hex");

  if (expected !== razorpay_signature) {
    return Response.json({ error: "Invalid signature" }, { status: 400 });
  }

  await db
    .update(usersTable)
    .set({
      plan,
      razorpayPaymentId: razorpay_payment_id,
      razorpayOrderId: razorpay_order_id,
      razorpaySignature: razorpay_signature,
      planActivatedAt: new Date().toISOString(),
    })
    .where(eq(usersTable.id, userId));

  return Response.json({ success: true });
}
