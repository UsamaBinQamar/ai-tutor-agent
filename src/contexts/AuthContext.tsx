"use client";

import { createBrowserClient } from "@supabase/ssr";
import { AuthError, User, UserIdentity } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

interface UserDetails {
  id: string | null;
  fullName: string | null;
  role: string | null;
  email: string | null;
  identities: UserIdentity[] | null;
  appMetadata: Record<string, unknown> | null;
  createdAt: string | null;
  lastSignInAt: string | null;
}

interface SubscriptionData {
  stripeCustomerId: string | null;
  subscriptionId: string | null;
  subscriptionStartDate: string | null;
  subscriptionEndDate: string | null;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  userDetails: UserDetails | null;
  signUp: (
    email: string,
    password: string,
    name: string,
    role: string
  ) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  isSubscribed: boolean;
  subscriptionPlan: string | null;
  subscriptionStatus: string | null;
  subscriptionData: SubscriptionData | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionPlan, setSubscriptionPlan] = useState<string | null>(null);
  const [subscriptionStatus, setSubscriptionStatus] = useState<string | null>(
    null
  );
  const [subscriptionData, setSubscriptionData] =
    useState<SubscriptionData | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const initializeAuth = async () => {
      console.log("Initializing auth...");
      try {
        // First get the session
        const {
          data: { session },
        } = await supabase.auth.getSession();
        console.log("Initial session data:", session);

        // Then get the latest user data directly
        const {
          data: { user: freshUser },
          error: userError,
        } = await supabase.auth.getUser();

        if (!userError && freshUser) {
          console.log("Fresh user data:", freshUser);
          console.log("Complete user metadata:", freshUser.user_metadata);
          setUser(freshUser); // Use the fresh user data instead

          // Extract and update user details
          updateUserDetails(freshUser);

          // Process subscription data from metadata
          if (freshUser.user_metadata) {
            const metadata = freshUser.user_metadata;
            console.log("Full metadata:", metadata);

            // Set subscription state from metadata
            setIsSubscribed(metadata.subscription_status === "active");
            setSubscriptionPlan(metadata.subscription_plan || null);
            setSubscriptionStatus(metadata.subscription_status || null);
            setSubscriptionData({
              stripeCustomerId: metadata.stripe_customer_id || null,
              subscriptionId: metadata.subscription_id || null,
              subscriptionStartDate: metadata.subscription_start_date || null,
              subscriptionEndDate: metadata.subscription_end_date || null,
            });
          }
        } else if (session?.user) {
          // Fallback to session user if we couldn't get fresh data
          console.log("Using session user data");
          setUser(session.user);
          updateUserDetails(session.user);

          // Process metadata from session user
          const metadata = session.user.user_metadata;
          if (metadata) {
            setIsSubscribed(metadata.subscription_status === "active");
            setSubscriptionPlan(metadata.subscription_plan || null);
            setSubscriptionStatus(metadata.subscription_status || null);
            setSubscriptionData({
              stripeCustomerId: metadata.stripe_customer_id || null,
              subscriptionId: metadata.subscription_id || null,
              subscriptionStartDate: metadata.subscription_start_date || null,
              subscriptionEndDate: metadata.subscription_end_date || null,
            });
          }
        } else {
          // No user found
          console.log("No user found in session or direct fetch");
          setUser(null);
          updateUserDetails(null);
          resetSubscriptionData();
        }

        // Listen for auth state changes
        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange(async (_event, session) => {
          console.log("Auth state changed:", _event);

          if (session?.user) {
            console.log("User in session after auth change");

            // Get fresh user data on important auth events
            if (
              _event === "SIGNED_IN" ||
              _event === "TOKEN_REFRESHED" ||
              _event === "USER_UPDATED"
            ) {
              const {
                data: { user: updatedUser },
                error: refreshError,
              } = await supabase.auth.getUser();

              if (!refreshError && updatedUser) {
                console.log("Refreshed user data after auth change");
                setUser(updatedUser);
                updateUserDetails(updatedUser);

                const metadata = updatedUser.user_metadata;
                console.log("Updated metadata:", metadata);

                setIsSubscribed(metadata?.subscription_status === "active");
                setSubscriptionPlan(metadata?.subscription_plan || null);
                setSubscriptionStatus(metadata?.subscription_status || null);
                setSubscriptionData({
                  stripeCustomerId: metadata?.stripe_customer_id || null,
                  subscriptionId: metadata?.subscription_id || null,
                  subscriptionStartDate:
                    metadata?.subscription_start_date || null,
                  subscriptionEndDate: metadata?.subscription_end_date || null,
                });
              } else {
                // Fallback to session user
                setUser(session.user);
                updateUserDetails(session.user);

                const metadata = session.user.user_metadata;
                setIsSubscribed(metadata?.subscription_status === "active");
                setSubscriptionPlan(metadata?.subscription_plan || null);
                setSubscriptionStatus(metadata?.subscription_status || null);
                setSubscriptionData({
                  stripeCustomerId: metadata?.stripe_customer_id || null,
                  subscriptionId: metadata?.subscription_id || null,
                  subscriptionStartDate:
                    metadata?.subscription_start_date || null,
                  subscriptionEndDate: metadata?.subscription_end_date || null,
                });
              }
            } else {
              // For other events, use session user directly
              setUser(session.user);
              updateUserDetails(session.user);

              const metadata = session.user.user_metadata;
              setIsSubscribed(metadata?.subscription_status === "active");
              setSubscriptionPlan(metadata?.subscription_plan || null);
              setSubscriptionStatus(metadata?.subscription_status || null);
              setSubscriptionData({
                stripeCustomerId: metadata?.stripe_customer_id || null,
                subscriptionId: metadata?.subscription_id || null,
                subscriptionStartDate:
                  metadata?.subscription_start_date || null,
                subscriptionEndDate: metadata?.subscription_end_date || null,
              });
            }

            // Refresh the page to update server-side data
            router.refresh();
          } else {
            console.log("No user in session after auth change");
            setUser(null);
            updateUserDetails(null);
            resetSubscriptionData();
          }
        });

        return () => {
          console.log("Unsubscribing from auth changes");
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error("Auth initialization error:", error);
      } finally {
        setLoading(false);
      }
    };

    // Helper function to update user details
    const updateUserDetails = (user: User | null) => {
      if (!user) {
        setUserDetails(null);
        return;
      }

      setUserDetails({
        id: user.id || null,
        email: user.email || null,
        fullName: user.user_metadata?.full_name || null,
        role: user.user_metadata?.role || null,
        createdAt: user.created_at,
        lastSignInAt: user.last_sign_in_at || null,
        identities: user.identities || null,
        appMetadata: user.app_metadata || null,
      });
    };

    // Helper function to reset subscription data
    const resetSubscriptionData = () => {
      setIsSubscribed(false);
      setSubscriptionPlan(null);
      setSubscriptionStatus(null);
      setSubscriptionData(null);
    };

    initializeAuth();
  }, [router, supabase.auth]);

  const signUp = async (
    email: string,
    password: string,
    name: string,
    role: string
  ) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            role: role,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;

      if (data.user) {
        toast.success("Verification email sent! Please check your inbox.");
        router.push("/login");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error((error as AuthError).message);
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        toast.success("Logged in successfully!");
        router.refresh();
        router.push("/");
      }
    } catch (error) {
      toast.error((error as AuthError).message);
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      toast.success("Signed out successfully!");
      router.push("/login");
      router.refresh();
      setUser(null);
      setUserDetails(null);
      setIsSubscribed(false);
      setSubscriptionPlan(null);
      setSubscriptionStatus(null);
      setSubscriptionData(null);
    } catch (error) {
      toast.error((error as AuthError).message);
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      toast.success("Password reset email sent! Please check your inbox.");
    } catch (error) {
      console.error("Error sending password reset email:", error);
      toast.error(
        error instanceof AuthError
          ? error.message
          : "Failed to send password reset email"
      );
      throw error;
    }
  };

  const resetPassword = async (token: string, newPassword: string) => {
    try {
      // When Supabase redirects to this page, it has already verified the token
      // We just need to update the password
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      toast.success("Password has been reset successfully!");
      router.push("/login");
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error(
        error instanceof AuthError ? error.message : "Failed to reset password"
      );
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        userDetails,
        signUp,
        signIn,
        signOut,
        forgotPassword,
        resetPassword,
        isSubscribed,
        subscriptionPlan,
        subscriptionStatus,
        subscriptionData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
