"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Menu,
  X,
  User,
  LogIn,
  LogOut,
  Book,
  Sparkles,
} from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn] = useState(false); // This would be replaced with actual auth state

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-900/80 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 p-1"
            >
              <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-900">
                <Bot className="h-5 w-5 text-white" />
              </div>
            </motion.div>
            <span className="text-xl font-bold text-white">
              AI{" "}
              <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Tutor
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link
              href="/ai-tutor"
              className="group flex items-center space-x-1 text-sm font-medium text-gray-300 transition-colors hover:text-white"
            >
              <Book className="h-4 w-4 text-purple-400 group-hover:text-purple-300" />
              <span>AI Tutor</span>
            </Link>
            <Link
              href="/features"
              className="group flex items-center space-x-1 text-sm font-medium text-gray-300 transition-colors hover:text-white"
            >
              <Sparkles className="h-4 w-4 text-indigo-400 group-hover:text-indigo-300" />
              <span>Features</span>
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium text-gray-300 transition-colors hover:text-white"
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-gray-300 transition-colors hover:text-white"
            >
              About
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {isLoggedIn ? (
              <>
                <Link href="/dashboard">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white shadow-md transition-all hover:bg-slate-700"
                  >
                    <User className="h-4 w-4" />
                    <span>Dashboard</span>
                  </motion.button>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 rounded-lg border border-slate-700 bg-transparent px-4 py-2 text-sm font-medium text-white shadow-md transition-all hover:bg-slate-800"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </motion.button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 rounded-lg border border-slate-700 bg-transparent px-4 py-2 text-sm font-medium text-white shadow-md transition-all hover:bg-slate-800"
                  >
                    <LogIn className="h-4 w-4" />
                    <span>Login</span>
                  </motion.button>
                </Link>
                <Link href="/signup">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 rounded-lg bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 px-4 py-2 text-sm font-medium text-white shadow-md transition-all hover:from-purple-600 hover:via-indigo-600 hover:to-blue-600"
                  >
                    <span>Sign Up</span>
                  </motion.button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-300 hover:bg-slate-800 hover:text-white focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden"
          >
            <div className="space-y-1 bg-slate-900/95 px-2 pb-3 pt-2 backdrop-blur-md">
              <Link
                href="/ai-tutor"
                className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-slate-800"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                AI Tutor
              </Link>
              <Link
                href="/features"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-slate-800 hover:text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="/pricing"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-slate-800 hover:text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/about"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-slate-800 hover:text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              {isLoggedIn ? (
                <>
                  <Link
                    href="/dashboard"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-slate-800 hover:text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    className="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-gray-300 hover:bg-slate-800 hover:text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-slate-800 hover:text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-slate-800 hover:text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
