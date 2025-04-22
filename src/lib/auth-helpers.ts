import { User } from "@supabase/supabase-js";

export const getUserRole = (user: User | null): string => {
  return user?.user_metadata?.role || "user";
};

export const isAdmin = (user: User | null): boolean => {
  return getUserRole(user) === "admin";
};

export const isModerator = (user: User | null): boolean => {
  return getUserRole(user) === "moderator";
};
