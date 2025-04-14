"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  MessageSquare,
  Zap,
} from "lucide-react";
import Link from "next/link";
import Footer from "./Footer";
import { LampDemo } from "./Hero";

// ChatInterface logic (now integrated directly into the page)

export default function Home() {
  // Landing page state

  // Chat interface state

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-20 items-center justify-between px-6">
          <Link className="flex items-center space-x-3 font-bold" href="/">
            <Bot className="h-8 w-8 text-cyan-400" />
            <span className="text-xl">ChatFlow</span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link
              className="text-gray-300 hover:text-cyan-400 transition-colors"
              href="#features"
            >
              Features
            </Link>
            <Link
              className="text-gray-300 hover:text-cyan-400 transition-colors"
              href="#pricing"
            >
              Pricing
            </Link>
            <Link
              className="text-gray-300 hover:text-cyan-400 transition-colors"
              href="#about"
            >
              About
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              className="hidden text-gray-300 hover:text-cyan-400 transition-colors sm:block"
              href="/login"
            >
              Sign In
            </Link>
            <Link href="/ai-tutor">
              <Button className="bg-gradient-to-r from-cyan-400 to-violet-500 text-black font-medium hover:from-cyan-500 hover:to-violet-600 shadow-lg shadow-violet-500/20">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <LampDemo /> {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
        {/* Animated Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Curved Lines */}
          <svg
            className="absolute h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="grad1" x1="1" y1="0" x2="0" y2="0">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
                <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="grad2" x1="1" y1="0" x2="0" y2="0">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
                <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Top Curves */}
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                repeatDelay: 1,
              }}
              d="M 100 100 Q 300 0 500 100 T 900 100"
              fill="none"
              stroke="url(#grad1)"
              strokeWidth="1"
            />
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                repeatDelay: 1,
                delay: 0.5,
              }}
              d="M 0 200 Q 200 100 400 200 T 800 200"
              fill="none"
              stroke="url(#grad2)"
              strokeWidth="1"
            />
            {/* Bottom Curves */}
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                repeatDelay: 1,
                delay: 1,
              }}
              d="M 100 600 Q 300 500 500 600 T 900 600"
              fill="none"
              stroke="url(#grad1)"
              strokeWidth="1"
            />
          </svg>

          {/* Straight Lines */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ x: "100%", opacity: 0 }}
                animate={{
                  x: "-100%",
                  opacity: [0, 0.7, 0.7, 0],
                }}
                transition={{
                  duration: 2.5,
                  delay: i * 0.2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  ease: "linear",
                }}
                className="absolute right-0"
                style={{
                  top: `${15 + i * 10}%`,
                  height: "1px",
                  width: "100%",
                  background: `linear-gradient(90deg, transparent, ${
                    i % 2 === 0 ? "#22d3ee" : "#8b5cf6"
                  }60, transparent)`,
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Animated Background */}
        <div className="absolute inset-0 z-[1]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="absolute -left-1/4 top-1/4 h-96 w-96 rounded-full bg-cyan-500/30 blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
            className="absolute -right-1/4 top-1/2 h-96 w-96 rounded-full bg-violet-500/30 blur-3xl"
          />
        </div>

        {/* Content */}
        <div className="container relative z-[3] px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mx-auto max-w-3xl space-y-8"
          >
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              AI-Powered Chatbots for 24/7 Customer Engagement
            </h1>
            <p className="mx-auto max-w-2xl text-muted text-gray-400 sm:text-xl">
              Boost sales and customer satisfaction with intelligent chatbots
              that engage your visitors around the clock. Transform your website
              into a conversion machine.
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="/ai-tutor">
                <Button className="bg-gradient-to-r from-cyan-400 to-violet-500 text-lg text-black hover:from-cyan-500 hover:to-violet-600">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button
                variant="outline"
                className="border-white/10 text-lg text-white hover:bg-white/10"
              >
                See Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Features Section */}
      <section
        id="features"
        className="relative z-10 border-t border-white/10 bg-black py-24 display flex justify-center items-center"
      >
        <div className="container px-4">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Why Choose ChatFlow?
            </h2>
            <p className="mt-4 text-gray-400">
              Supercharge your business with AI-driven conversations
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-cyan-400/50"
            >
              <MessageSquare className="mb-4 h-12 w-12 text-cyan-400" />
              <h3 className="mb-2 text-xl font-bold">24/7 Customer Support</h3>
              <p className="text-gray-400">
                Provide instant answers and support to your customers at any
                time, day or night.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-violet-400/50"
            >
              <Zap className="mb-4 h-12 w-12 text-violet-400" />
              <h3 className="mb-2 text-xl font-bold">Boost Conversions</h3>
              <p className="text-gray-400">
                Turn visitors into customers with personalized recommendations
                and timely engagement.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-cyan-400/50"
            >
              <Bot className="mb-4 h-12 w-12 text-cyan-400" />
              <h3 className="mb-2 text-xl font-bold">AI-Powered Insights</h3>
              <p className="text-gray-400">
                Gain valuable customer insights and improve your business with
                AI-driven analytics.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="relative z-10 border-t border-white/10 bg-black py-24 display flex justify-center items-center">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-gradient-to-r from-cyan-950/50 to-violet-950/50 p-8 text-center backdrop-blur-sm md:p-12 lg:p-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Ready to Supercharge Your Customer Engagement?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-gray-400">
              Join thousands of businesses that use ChatFlow to boost sales and
              satisfaction.
            </p>
            <ul className="mx-auto mt-8 flex max-w-xl flex-col gap-4 text-left">
              <li className="flex items-center space-x-3">
                <CheckCircle2 className="h-5 w-5 text-cyan-400" />
                <span>Increase sales with 24/7 engagement</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle2 className="h-5 w-5 text-cyan-400" />
                <span>Reduce support costs with AI-powered responses</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle2 className="h-5 w-5 text-cyan-400" />
                <span>Improve customer satisfaction with instant support</span>
              </li>
            </ul>
            <Button className="mt-8 bg-gradient-to-r from-cyan-400 to-violet-500 text-lg text-black hover:from-cyan-500 hover:to-violet-600">
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
      <Footer />
      {/* Floating Chat Icon with Animation */}
      <motion.div
        className="fixed bottom-4 right-4 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          y: [0, -10, 0],
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 1,
          y: {
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          },
        }}
      >
        <motion.div
          className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 2,
            type: "spring",
            stiffness: 500,
            damping: 15,
          }}
        >
          1
        </motion.div>
      </motion.div>
    </div>
  );
}
