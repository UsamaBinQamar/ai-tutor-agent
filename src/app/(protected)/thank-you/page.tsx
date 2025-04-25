"use client";

import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export default function ThankYouPage() {
  const [countdown, setCountdown] = useState(10);
  const router = useRouter();
  const { signOut } = useAuth();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Sign out the user
          signOut();
          // Show success message
          toast.success(
            "Subscription successful! Please sign in again to access AI Tutor."
          );
          // Redirect to home page
          router.push("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router, signOut]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center">
      <div className="text-center space-y-8 max-w-2xl mx-auto px-4">
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 rounded-full blur-xl opacity-50"></div>
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 p-1">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-900">
                <CheckCircle className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>
        </div>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Thank You for Your Subscription!
        </h1>

        <p className="text-lg text-gray-300">
          Your payment was successful. You will be signed out and redirected to
          sign in again.
        </p>

        <div className="space-y-4">
          <p className="text-purple-400">
            Redirecting in {countdown} seconds...
          </p>

          <div className="flex justify-center space-x-4">
            <button
              onClick={() => {
                signOut();
                toast.success(
                  "Subscription successful! Please sign in again to access AI Tutor."
                );
                router.push("/");
              }}
              className="rounded-xl bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 px-6 py-3 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              Sign Out Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
