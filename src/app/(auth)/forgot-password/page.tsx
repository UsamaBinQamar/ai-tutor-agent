"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ForgotPasswordFormType,
  forgotPasswordSchema,
} from "@/lib/schemas/auth";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const { forgotPassword } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormType>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormType) => {
    await forgotPassword(data.email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Reset your password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Enter your email address and we&apos;ll send you a link to reset
            your password
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md space-y-4">
            <div>
              <Input
                {...register("email")}
                type="email"
                placeholder="Email address"
                error={errors.email?.message}
                className="w-full px-4 py-3 rounded-lg bg-[#1e2937] border border-gray-700 focus:outline-none focus:border-[#00FF9D] text-white placeholder-gray-400"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-black bg-[#00FF9D] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00FF9D] transition-colors"
            >
              {isSubmitting ? "Sending..." : "Send reset link"}
            </button>
          </div>

          <div className="text-center text-sm mt-4">
            <Link
              href="/login"
              className="text-[#00FF9D] hover:text-opacity-90 transition-colors"
            >
              Back to login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
