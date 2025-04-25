export interface SubscriptionStatus {
  isActive: boolean;
  subscriptionId: string | null;
  subscriptionStatus: string | null;
  subscriptionPlan: string | null;
  subscriptionStartDate: string | null;
  subscriptionEndDate: string | null;
}

export async function checkSubscriptionStatus(
  customerId: string
): Promise<SubscriptionStatus> {
  try {
    const response = await fetch("/api/subscription/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ customerId }),
    });

    if (!response.ok) {
      throw new Error("Failed to check subscription status");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error checking subscription status:", error);
    return {
      isActive: false,
      subscriptionId: null,
      subscriptionStatus: null,
      subscriptionPlan: null,
      subscriptionStartDate: null,
      subscriptionEndDate: null,
    };
  }
}
