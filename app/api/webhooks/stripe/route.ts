import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return NextResponse.json({ error: "Stripe Webhook Secretが設定されていません。" }, { status: 500 });
  }

  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Stripe signature is missing." }, { status: 400 });
  }

  const body = await request.text();

  try {
    const stripe = getStripe();
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      // ADMIN_EMAIL can be used here when an email provider is added.
      // Keep this route free of console output because metadata may contain personal information.
      void session.metadata;
      void process.env.ADMIN_EMAIL;
    }

    return NextResponse.json({ received: true });
  } catch {
    return NextResponse.json({ error: "Webhook signature verification failed." }, { status: 400 });
  }
}
