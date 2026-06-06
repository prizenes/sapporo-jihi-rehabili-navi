import Stripe from "stripe";
import { plans, type ServicePlanId } from "@/lib/service-content";

export function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Missing Stripe secret key.");
  }

  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    typescript: true
  });
}

export function getPlanForCheckout(planId: ServicePlanId) {
  const plan = plans.find((item) => item.id === planId);

  if (!plan) {
    return null;
  }

  const priceId = process.env[plan.envKey];

  if (!priceId) {
    throw new Error(`Missing Stripe price environment variable: ${plan.envKey}`);
  }

  return {
    plan,
    priceId
  };
}

export function getBaseUrl(request: Request) {
  const host = request.headers.get("host");
  const protocol = host?.includes("localhost") ? "http" : "https";

  return process.env.NEXT_PUBLIC_SITE_URL ?? `${protocol}://${host}`;
}
