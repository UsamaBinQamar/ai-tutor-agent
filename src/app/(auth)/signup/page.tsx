"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupFormType, signupSchema } from "@/lib/schemas/auth";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { toast } from "sonner";

export default function SignupPage() {
  const { signUp } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormType>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormType) => {
    try {
      console.log("Form data:", data); // Debug log
      await signUp(data.email, data.password, data.name, "user");
    } catch (error) {
      console.error("Signup error:", error); // Debug log
      toast.error("Failed to create account. Please try again.");
    }
  };

  // Debug log for form errors
  console.log("Form errors:", errors);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Join our community and start sharing prompts
          </p>
        </div>
        <form
          className="mt-8 space-y-6"
          onSubmit={handleSubmit(onSubmit)}
          noValidate // Add this to prevent browser validation
        >
          <div className="rounded-md space-y-4">
            <div>
              <Input
                {...register("name")}
                type="text"
                placeholder="Full name"
                error={errors.name?.message}
              />
            </div>
            <div>
              <Input
                {...register("email")}
                type="email"
                placeholder="Email address"
                error={errors.email?.message}
              />
            </div>
            <div>
              <Input
                {...register("password")}
                type="password"
                placeholder="Password"
                error={errors.password?.message}
              />
            </div>
            <div>
              <Input
                {...register("confirmPassword")}
                type="password"
                placeholder="Confirm password"
                error={errors.confirmPassword?.message}
              />
            </div>
          </div>

          {/* Add general form error display */}
          {Object.keys(errors).length > 0 && (
            <div className="text-red-500 text-sm text-center">
              Please fix the errors above
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-black bg-[#00FF9D] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00FF9D] transition-colors"
            >
              {isSubmitting ? "Creating account..." : "Create account"}
            </button>
          </div>

          <div className="text-center text-sm mt-4">
            <Link
              href="/login"
              className="text-[#00FF9D] hover:text-opacity-90 transition-colors"
            >
              Already have an account? Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
