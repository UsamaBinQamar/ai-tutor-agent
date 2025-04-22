"use client";

import { motion } from "framer-motion";
import { ArrowRight, Book, Brain, Lightbulb, Sparkles } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-purple-500 opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-indigo-500 opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-blue-500 opacity-10 blur-3xl"></div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-28">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="mx-auto mb-12 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 p-1"
                >
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-900">
                    <Sparkles className="h-10 w-10 text-white" />
                  </div>
                </motion.div>
                <div className="space-y-4">
                  <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
                    <motion.span
                      className="block mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      Your Personal
                    </motion.span>
                    <motion.span
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      AI Learning Companion
                    </motion.span>
                  </h1>
                </div>
                <motion.p
                  className="mx-auto mt-8 max-w-2xl text-lg text-gray-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  Experience personalized learning with our advanced AI tutor.
                  Get instant help with any subject, improve your study skills,
                  and achieve your academic goals.
                </motion.p>
                <motion.div
                  className="mt-12 flex justify-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                >
                  <Link href="/ai-tutor">
                    <motion.button
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 0 20px rgba(139, 92, 246, 0.5)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="group relative rounded-xl bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 px-8 py-4 text-white shadow-lg transition-all duration-300"
                    >
                      <span className="relative z-10 flex items-center">
                        Start Learning Now
                        <ArrowRight className="ml-2 inline-block h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </span>
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 opacity-0 transition-opacity group-hover:opacity-100"></div>
                    </motion.button>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                AI Tutor
              </span>
              ?
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              Experience the future of personalized learning with our advanced
              features
            </p>
          </motion.div>

          <div className="mt-20 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            <motion.div
              whileHover={{
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)",
              }}
              className="group rounded-2xl bg-slate-800/50 p-8 shadow-lg backdrop-blur-sm border border-slate-700/50"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 p-1">
                <div className="flex h-full w-full items-center justify-center rounded-lg bg-slate-800">
                  <Brain className="h-6 w-6 text-purple-400" />
                </div>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-white">
                Smart Learning
              </h3>
              <p className="mt-4 text-gray-300">
                Advanced AI algorithms adapt to your learning style and pace,
                providing personalized guidance.
              </p>
            </motion.div>

            <motion.div
              whileHover={{
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)",
              }}
              className="group rounded-2xl bg-slate-800/50 p-8 shadow-lg backdrop-blur-sm border border-slate-700/50"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 p-1">
                <div className="flex h-full w-full items-center justify-center rounded-lg bg-slate-800">
                  <Book className="h-6 w-6 text-indigo-400" />
                </div>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-white">
                Comprehensive Subjects
              </h3>
              <p className="mt-4 text-gray-300">
                Cover all major academic subjects with detailed explanations and
                examples.
              </p>
            </motion.div>

            <motion.div
              whileHover={{
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)",
              }}
              className="group rounded-2xl bg-slate-800/50 p-8 shadow-lg backdrop-blur-sm border border-slate-700/50"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 p-1">
                <div className="flex h-full w-full items-center justify-center rounded-lg bg-slate-800">
                  <Lightbulb className="h-6 w-6 text-blue-400" />
                </div>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-white">
                Interactive Learning
              </h3>
              <p className="mt-4 text-gray-300">
                Engage in dynamic conversations and get instant feedback on your
                questions.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative isolate overflow-hidden py-16 sm:py-24">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-90"></div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to Transform Your Learning Experience?
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-purple-100">
                Join thousands of students who are already benefiting from
                AI-powered learning assistance.
              </p>
              <div className="mt-10">
                <Link href="/ai-tutor">
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative rounded-xl bg-white px-8 py-4 text-purple-600 shadow-lg transition-all duration-300"
                  >
                    <span className="relative z-10 flex items-center font-semibold">
                      Get Started Now
                      <ArrowRight className="ml-2 inline-block h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </span>
                    <div className="absolute inset-0 rounded-xl bg-white opacity-0 transition-opacity group-hover:opacity-80"></div>
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
