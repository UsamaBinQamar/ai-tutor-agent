"use client";

import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { LoginFormType, loginSchema } from "@/lib/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const { signIn, user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormType) => {
    await signIn(data.email, data.password);
  };

  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      {/* Animated background elements */}

      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="text-center fade-in">
          <h2 className="text-3xl font-bold text-gradient">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-gray-300">
            Enter your credentials to access your account
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
                className="bg-slate-800/50 border-slate-700/50 text-white placeholder-gray-400 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div>
              <Input
                {...register("password")}
                type="password"
                placeholder="Password"
                error={errors.password?.message}
                className="bg-slate-800/50 border-slate-700/50 text-white placeholder-gray-400 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-3 px-4 text-sm font-medium rounded-xl text-white bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </button>
          </div>

          <div className="flex items-center justify-center space-x-4 text-sm mt-4">
            <Link
              href="/sign-up"
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              Create account
            </Link>
            <span className="text-gray-500">•</span>
            <Link
              href="/forgot-password"
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              Forgot password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
