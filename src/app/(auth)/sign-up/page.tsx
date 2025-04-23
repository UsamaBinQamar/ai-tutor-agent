"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupFormType, signupSchema } from "@/lib/schemas/auth";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { toast } from "sonner";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const { signUp, user } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormType>({
    resolver: zodResolver(signupSchema),
  });
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);
  const onSubmit = async (data: SignupFormType) => {
    try {
      console.log("Form data:", data);
      await signUp(data.email, data.password, data.name, "user");
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Failed to create account. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      {/* Animated background elements */}

      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="text-center fade-in">
          <h2 className="text-3xl font-bold text-gradient">
            Create your account
          </h2>
          <p className="mt-2 text-center text-gray-300">
            Join our community and start your learning journey
          </p>
        </div>
        <form
          className="mt-8 space-y-6"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="rounded-md space-y-4">
            <div>
              <Input
                {...register("name")}
                type="text"
                placeholder="Full name"
                error={errors.name?.message}
                className="bg-slate-800/50 border-slate-700/50 text-white placeholder-gray-400 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
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
            <div>
              <Input
                {...register("confirmPassword")}
                type="password"
                placeholder="Confirm password"
                error={errors.confirmPassword?.message}
                className="bg-slate-800/50 border-slate-700/50 text-white placeholder-gray-400 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>

          {Object.keys(errors).length > 0 && (
            <div className="text-red-400 text-sm text-center">
              Please fix the errors above
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-3 px-4 text-sm font-medium rounded-xl text-white bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              {isSubmitting ? "Creating account..." : "Create account"}
            </button>
          </div>

          <div className="text-center text-sm mt-4">
            <Link
              href="/login"
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              Already have an account? Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
