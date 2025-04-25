import { createServerClient } from "@supabase/ssr";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const supabase = createServerClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    cookies: {
      get: () => "",
      set: () => {},
      remove: () => {},
    },
  }
);

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get("stripe-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "Missing stripe-signature header" },
        { status: 400 }
      );
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
    } catch (err) {
      console.error(`Webhook signature verification failed:`, err);
      return NextResponse.json(
        { error: "Webhook signature verification failed" },
        { status: 400 }
      );
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutSessionCompleted(session);
        break;
      }
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdated(subscription);
        break;
      }
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscription);
        break;
      }
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}

async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session
) {
  try {
    const customerId = session.customer as string;
    const subscriptionId = session.subscription as string;

    // Get the subscription details
    const subscriptionResponse = await stripe.subscriptions.retrieve(
      subscriptionId
    );
    const subscription = subscriptionResponse as unknown as {
      current_period_end: number;
      status: string;
      start_date: number;
      items: { data: Array<{ price: { id: string } }> };
    };
    const priceId = subscription.items.data[0].price.id;
    const isMonthly = priceId === process.env.MONTHLY_PRICE_ID;

    // Get the customer details
    const customer = (await stripe.customers.retrieve(
      customerId
    )) as Stripe.Customer;
    const supabaseUserId = customer.metadata.supabase_id;

    // Calculate subscription end date
    const currentPeriodEnd = subscription.current_period_end;
    const subscriptionEndDate = currentPeriodEnd
      ? new Date(currentPeriodEnd * 1000).toISOString()
      : null;

    // Prepare metadata update
    const metadataUpdate = {
      stripe_customer_id: customerId,
      subscription_id: subscriptionId,
      subscription_status: subscription.status,
      subscription_plan: isMonthly ? "monthly" : "yearly",
      subscription_start_date: new Date(
        subscription.start_date * 1000
      ).toISOString(),
      subscription_end_date: subscriptionEndDate,
    };

    console.log("Updating user metadata with:", metadataUpdate);

    // Update user metadata with subscription details
    const { data, error } = await supabase.auth.admin.updateUserById(
      supabaseUserId,
      {
        user_metadata: metadataUpdate,
      }
    );

    if (error) {
      console.error("Error updating user metadata:", error);
      console.error("Error details:", error.message);
    } else {
      console.log("Successfully updated user metadata for:", supabaseUserId);
      console.log("Updated metadata:", metadataUpdate);
      console.log("Response data:", data);
    }

    console.log(`Subscription created for user ${supabaseUserId}`);
  } catch (error) {
    console.error("Error handling checkout session completed:", error);
    if (error instanceof Error) {
      console.error("Error details:", error.message);
    }
  }
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  try {
    const subscriptionData = subscription as unknown as {
      current_period_end: number;
    };
    const customerId = subscription.customer as string;
    const priceId = subscription.items.data[0].price.id;
    const isMonthly = priceId === process.env.MONTHLY_PRICE_ID;

    // Get the customer details
    const customer = (await stripe.customers.retrieve(
      customerId
    )) as Stripe.Customer;
    const supabaseUserId = customer.metadata.supabase_id;

    // Update user metadata with subscription details
    const { error } = await supabase.auth.admin.updateUserById(supabaseUserId, {
      user_metadata: {
        subscription_status: subscription.status,
        subscription_plan: isMonthly ? "monthly" : "yearly",
        subscription_end_date: new Date(
          subscriptionData.current_period_end * 1000
        ).toISOString(),
      },
    });

    if (error) {
      console.error("Error updating user metadata:", error);
    }

    console.log(`Subscription updated for user ${supabaseUserId}`);
  } catch (error) {
    console.error("Error handling subscription updated:", error);
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  try {
    const customerId = subscription.customer as string;

    // Get the customer details
    const customer = (await stripe.customers.retrieve(
      customerId
    )) as Stripe.Customer;
    const supabaseUserId = customer.metadata.supabase_id;

    // Update user metadata to remove subscription details
    const { error } = await supabase.auth.admin.updateUserById(supabaseUserId, {
      user_metadata: {
        subscription_id: null,
        subscription_status: "canceled",
        subscription_plan: null,
        subscription_end_date: null,
      },
    });

    if (error) {
      console.error("Error updating user metadata:", error);
    }

    console.log(`Subscription canceled for user ${supabaseUserId}`);
  } catch (error) {
    console.error("Error handling subscription deleted:", error);
  }
}
