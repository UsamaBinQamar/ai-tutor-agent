"use client";

import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { LoginFormType, loginSchema } from "@/lib/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { signIn, user } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormType) => {
    await signIn(data.email, data.password);
    if (user) {
      router.push("/");
    }
  };

  // Show loading or nothing while checking authentication
  if (user) {
    return null; // or a loading spinner
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
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
                className="w-full px-4 py-3 rounded-lg bg-[#1e2937] border border-gray-700 focus:outline-none focus:border-[#00FF9D] text-white placeholder-gray-400"
              />
            </div>
            <div>
              <Input
                {...register("password")}
                type="password"
                placeholder="Password"
                error={errors.password?.message}
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
              {isSubmitting ? "Signing in..." : "Sign in"}
            </button>
          </div>

          <div className="flex items-center justify-center space-x-4 text-sm mt-4">
            <Link
              href="/signup"
              className="text-[#00FF9D] hover:text-opacity-90 transition-colors"
            >
              Create account
            </Link>
            <span className="text-gray-500">•</span>
            <Link
              href="/forgot-password"
              className="text-[#00FF9D] hover:text-opacity-90 transition-colors"
            >
              Forgot password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
