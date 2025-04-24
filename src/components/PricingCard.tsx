"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";

interface PricingCardProps {
  title: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isYearly?: boolean;
  badge?: string;
}

export default function PricingCard({
  price,
  period,
  description,
  features,
  isYearly = false,
  badge,
}: PricingCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const handleCheckout = async () => {
    if (!user?.email) {
      console.log("No user email");
      // Redirect to login if not authenticated
      window.location.href = "/login";
      return;
    }

    setIsLoading(true);
    try {
      // Get the current session
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        console.log("No active session");
        throw new Error("No active session");
      }

      console.log("Session found");

      const response = await fetch(
        `/api/checkout/${isYearly ? "yearly" : "monthly"}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ email: user.email }),
        }
      );

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="group relative rounded-2xl bg-slate-800/50 p-8 shadow-lg backdrop-blur-sm border border-slate-700/50 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 fade-in-up">
      {badge && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 px-4 py-1 text-sm font-semibold text-white">
            {badge}
          </span>
        </div>
      )}
      <div className="text-center">
        <div className="mt-4">
          <span className="text-4xl font-bold text-white">{price}</span>
          <span className="text-gray-400">/{period}</span>
        </div>
        <p className="mt-4 text-gray-300">{description}</p>
        <ul className="mt-8 space-y-4 text-left">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <svg
                className="h-5 w-5 text-purple-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="ml-3 text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>
        <button
          onClick={handleCheckout}
          disabled={isLoading}
          className="mt-8 w-full group relative rounded-xl bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 px-8 py-4 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="relative z-10 flex items-center justify-center font-semibold">
            {isLoading ? "Processing..." : "Get Started"}
            {!isLoading && (
              <ArrowRight className="ml-2 inline-block h-5 w-5 transition-transform group-hover:translate-x-1" />
            )}
          </span>
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 opacity-0 transition-opacity group-hover:opacity-100"></div>
        </button>
      </div>
    </div>
  );
}
