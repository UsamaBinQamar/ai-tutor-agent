import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { PostgrestError } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const supabase = createServerClient(
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

interface UserData {
  id: string;
  user_metadata: {
    stripe_customer_id?: string;
    subscription_status?: string;
    subscription_plan?: string;
    subscription_start_date?: string;
    subscription_end_date?: string;
  };
}

export async function POST(req: Request) {
  try {
    const { customerId } = await req.json();

    if (!customerId) {
      return NextResponse.json(
        { error: "Customer ID is required" },
        { status: 400 }
      );
    }

    // Get customer's subscriptions from Stripe
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: "active",
      limit: 1,
    });

    const hasActiveSubscription = subscriptions.data.length > 0;
    const activeSubscription = subscriptions.data[0] as unknown as {
      id: string;
      status: string;
      start_date: number;
      current_period_end: number;
      items: {
        data: Array<{
          price: {
            id: string;
          };
        }>;
      };
    };

    // Get user metadata from Supabase
    const { data: users, error: userError } = (await supabase
      .from("users")
      .select("id, user_metadata")
      .eq("stripe_customer_id", customerId)
      .single()) as { data: UserData | null; error: PostgrestError | null };

    if (userError) {
      console.error("Error fetching user metadata:", userError);
    }

    // Verify subscription status with Stripe
    const isSubscriptionActive =
      hasActiveSubscription &&
      activeSubscription?.status === "active" &&
      activeSubscription?.current_period_end > Math.floor(Date.now() / 1000);

    // Get subscription plan type
    const priceId = activeSubscription?.items?.data[0]?.price?.id;
    const isMonthly = priceId === process.env.MONTHLY_PRICE_ID;
    const subscriptionPlan = isMonthly ? "monthly" : "yearly";

    const subscriptionData = {
      isActive: isSubscriptionActive,
      subscriptionId: activeSubscription?.id || null,
      subscriptionStatus: activeSubscription?.status || null,
      subscriptionPlan:
        subscriptionPlan || users?.user_metadata?.subscription_plan || null,
      subscriptionStartDate: activeSubscription?.start_date
        ? new Date(activeSubscription.start_date * 1000).toISOString()
        : null,
      subscriptionEndDate: activeSubscription?.current_period_end
        ? new Date(activeSubscription.current_period_end * 1000).toISOString()
        : null,
      // Additional verification data
      verifiedWithStripe: true,
      currentPeriodEnd: activeSubscription?.current_period_end || null,
      priceId: priceId || null,
    };

    // If subscription is not active, update user metadata
    if (!isSubscriptionActive && users?.user_metadata) {
      const { error: updateError } = await supabase.auth.admin.updateUserById(
        users.id,
        {
          user_metadata: {
            ...users.user_metadata,
            subscription_status: "inactive",
            subscription_plan: null,
            subscription_end_date: null,
          },
        }
      );

      if (updateError) {
        console.error("Error updating user metadata:", updateError);
      }
    }

    return NextResponse.json(subscriptionData);
  } catch (error) {
    console.error("Error checking subscription:", error);
    return NextResponse.json(
      { error: "Failed to check subscription status" },
      { status: 500 }
    );
  }
}
