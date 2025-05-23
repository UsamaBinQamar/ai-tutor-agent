"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Brain, Crown, LogOut, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

export default function Navbar() {
  const { user, signOut, isSubscribed, subscriptionPlan } = useAuth();
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 p-1">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-900">
                  <Brain className="h-4 w-4 text-white" />
                </div>
              </div>
              <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 text-xl font-bold group-hover:from-purple-500 group-hover:via-indigo-500 group-hover:to-blue-500 transition-all duration-300">
                AI Tutor
              </h1>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isSubscribed && (
              <Link
                href="/ai-tutor"
                className={`px-3 py-2 rounded-md text-sm transition-all duration-300 ${
                  isActive("/ai-tutor")
                    ? "text-purple-400 bg-gradient-to-r from-purple-500/20 via-indigo-500/20 to-blue-500/20"
                    : "text-gray-300 hover:text-purple-400 hover:bg-gradient-to-r hover:from-purple-500/10 hover:via-indigo-500/10 hover:to-blue-500/10"
                }`}
              >
                AI Tutor
              </Link>
            )}

            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 p-1">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-900">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-300">{user.email}</span>
                    {isSubscribed && (
                      <div className="flex items-center space-x-1">
                        <Crown className="h-3 w-3 text-yellow-400" />
                        <span className="text-xs text-yellow-400">
                          {subscriptionPlan === "monthly"
                            ? "Monthly Plan"
                            : "Yearly Plan"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => signOut()}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm text-gray-300 hover:text-purple-400 hover:bg-gradient-to-r hover:from-purple-500/10 hover:via-indigo-500/10 hover:to-blue-500/10 transition-all duration-300"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login">
                  <Button
                    variant="outline"
                    className={`${
                      isActive("/login")
                        ? "text-purple-400 bg-gradient-to-r from-purple-500/20 via-indigo-500/20 to-blue-500/20"
                        : "text-gray-300 hover:text-purple-400 hover:bg-gradient-to-r hover:from-purple-500/10 hover:via-indigo-500/10 hover:to-blue-500/10"
                    }`}
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button className="bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 text-white hover:from-purple-600 hover:via-indigo-600 hover:to-blue-600">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
