import { createServerClient } from "@supabase/ssr";
import Stripe from "stripe";
import { NextResponse } from "next/server";

// Validate environment variables
const requiredEnvVars = {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
  MONTHLY_PRICE_ID: process.env.MONTHLY_PRICE_ID,
};

// Check for missing environment variables
const missingVars = Object.entries(requiredEnvVars)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  .filter(([_, value]) => !value)
  .map(([key]) => key);

if (missingVars.length > 0) {
  console.error("Missing required environment variables:", missingVars);
  throw new Error(
    `Missing required environment variables: ${missingVars.join(", ")}`
  );
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Create admin client for user metadata updates
const supabaseAdmin = createServerClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    cookies: {
      get: () => undefined,
      set: () => undefined,
      remove: () => undefined,
    },
  }
);

// Create regular client for auth operations
const supabase = createServerClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    cookies: {
      get: () => undefined,
      set: () => undefined,
      remove: () => undefined,
    },
  }
);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    console.log("Email received:", email);

    // Get the request URL
    const url = new URL(request.url);
    const baseUrl = `${url.protocol}//${url.host}`;
    console.log("Base URL:", baseUrl);

    // Get session from Authorization header
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return NextResponse.json(
        { error: "No authorization header" },
        { status: 401 }
      );
    }

    const token = authHeader.replace("Bearer ", "");
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      console.error("Session verification error:", error);
      return NextResponse.json({ error: "Invalid session" }, { status: 401 });
    }

    console.log("User verified:", user);

    let customerId = user.user_metadata.stripe_customer_id;

    // If no customer ID exists, create a new customer
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: email,
        metadata: {
          supabase_id: user.id,
        },
      });
      customerId = customer.id;

      // Update user metadata with stripe_customer_id using admin client
      const { error: updateError } =
        await supabaseAdmin.auth.admin.updateUserById(user.id, {
          user_metadata: { stripe_customer_id: customerId },
        });

      if (updateError) {
        console.error("Error updating user metadata:", updateError);
      }
    }

    // Check if price ID exists
    if (!process.env.MONTHLY_PRICE_ID) {
      throw new Error("Monthly price ID is not configured");
    }

    // Create checkout session with customer ID
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price: process.env.MONTHLY_PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/`,
      cancel_url: `${baseUrl}`,
    });

    console.log("Checkout session created:", checkoutSession);
    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "An error occurred" },
      { status: 500 }
    );
  }
}
