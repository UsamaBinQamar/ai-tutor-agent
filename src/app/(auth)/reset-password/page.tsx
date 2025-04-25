"use client";

import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { ResetPasswordFormType, resetPasswordSchema } from "@/lib/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ResetPasswordPage() {
  const { user } = useAuth();

  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormType>({
    resolver: zodResolver(resetPasswordSchema),
  });
  const token = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error("Error getting supabase token:", error);
    }
    return data.session?.access_token;
  };

  useEffect(() => {
    const verifyToken = async () => {
      // If user is logged in, we don't need to verify token
      if (user) {
        setIsLoggedIn(true);
        setIsValidToken(true);
        return;
      }

      try {
        if (error) {
          console.error("Token verification error:", error);

          setIsValidToken(false);
        } else {
          setIsValidToken(true);
        }
      } catch (err) {
        console.error("Error verifying token:", err);
        setError("Failed to verify reset link");
        setIsValidToken(false);
      }
    };

    verifyToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, supabase.auth, user]);

  const onSubmit = async (data: ResetPasswordFormType) => {
    try {
      if (isLoggedIn) {
        // If logged in, update password directly
        supabase.auth.updateUser({
          password: data.password,
        });

        toast.success("Password updated successfully!");

        setTimeout(() => {
          router.push("/");
        }, 5000);
      } else {
        // If not logged in, use the token-based reset
        const { error } = await supabase.auth.updateUser({
          password: data.password,
        });

        if (error) {
          throw error;
        }

        toast.success("Password updated successfully!");
        setTimeout(() => {
          router.push("/");
        }, 5000);
      }
    } catch (error) {
      console.error("Reset password error:", error);
      setError("Failed to reset password. Please try again.");
    }
  };

  if (isValidToken === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="animate-pulse">
            <div className="h-8 w-3/4 bg-white/10 rounded mx-auto mb-4"></div>
            <div className="h-4 w-1/2 bg-white/10 rounded mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!isValidToken && !isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="bg-white/5 p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-extrabold text-white mb-4">
              Invalid Reset Link
            </h2>
            <p className="text-gray-300 mb-6">
              {error ||
                "The password reset link is invalid or has expired. Please request a new one."}
            </p>
            <Link
              href="/forgot-password"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-pink-500 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors"
            >
              Request New Reset Link
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white/5 p-8 rounded-lg shadow-lg">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white">
              {isLoggedIn ? "Update Password" : "Set New Password"}
            </h2>
            <p className="mt-2 text-sm text-gray-300">
              {isLoggedIn
                ? "Please enter your new password below"
                : "Please enter your new password below"}
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {error && (
              <div className="bg-pink-500/10 border border-pink-500/20 text-pink-400 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            <div className="rounded-md space-y-4">
              <div>
                <Input
                  {...register("password")}
                  type="password"
                  placeholder="New password"
                  error={errors.password?.message}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-pink-400 text-white placeholder-gray-300"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-pink-400">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div>
                <Input
                  {...register("confirmPassword")}
                  type="password"
                  placeholder="Confirm new password"
                  error={errors.confirmPassword?.message}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-pink-400 text-white placeholder-gray-300"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-pink-400">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-pink-500 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {isLoggedIn ? "Updating..." : "Resetting..."}
                  </span>
                ) : isLoggedIn ? (
                  "Update Password"
                ) : (
                  "Reset Password"
                )}
              </button>
            </div>

            <div className="text-center text-sm">
              <Link
                href={isLoggedIn ? "/profile" : "/login"}
                className="text-pink-400 hover:text-pink-300 transition-colors"
              >
                {isLoggedIn ? "Back to Profile" : "Back to login"}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
