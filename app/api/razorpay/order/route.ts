// app/api/razorpay/order/route.ts
import Razorpay from "razorpay";
import { auth } from "@clerk/nextjs/server";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { plan } = await req.json();

  const amount =
    plan === "lifetime" ? 5000 :
    plan === "annual" ? 1000 :
    1;

  const order = await razorpay.orders.create({
    amount: amount * 100,
    currency: "INR",
    receipt: `payment-${userId.slice(0,20)}`,
  });

  return Response.json(order);
}
