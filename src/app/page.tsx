"use client";

import { ArrowRight, Book, Brain, Lightbulb, Sparkles } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Hero Section */}
      <div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-28">
            <div className="text-center">
              <div className="space-y-8 fade-in">
                <div className="mx-auto mb-12 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 p-1 scale-in">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-900">
                    <Sparkles className="h-10 w-10 text-white" />
                  </div>
                </div>
                <div className="space-y-4">
                  <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
                    <span className="block mb-4 fade-in-up">Your Personal</span>
                    <span className="fade-in-up delay-200">
                      AI Learning Companion
                    </span>
                  </h1>
                </div>
                <p className="mx-auto mt-8 max-w-2xl text-lg text-gray-300 fade-in delay-300">
                  Experience personalized learning with our advanced AI tutor.
                  Get instant help with any subject, improve your study skills,
                  and achieve your academic goals.
                </p>
                <div className="mt-12 flex justify-center gap-4 fade-in-up delay-400">
                  <Link href="/ai-tutor">
                    <button className="group relative rounded-xl bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 px-8 py-4 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
                      <span className="relative z-10 flex items-center">
                        Start Learning Now
                        <ArrowRight className="ml-2 inline-block h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </span>
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 opacity-0 transition-opacity group-hover:opacity-100"></div>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Features Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center fade-in-up">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Why Choose <span className="text-gradient">AI Tutor</span>?
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              Experience the future of personalized learning with our advanced
              features
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            <div className="group rounded-2xl bg-slate-800/50 p-8 shadow-lg backdrop-blur-sm border border-slate-700/50 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 fade-in-up">
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
            </div>

            <div className="group rounded-2xl bg-slate-800/50 p-8 shadow-lg backdrop-blur-sm border border-slate-700/50 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 fade-in-up delay-100">
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
            </div>

            <div className="group rounded-2xl bg-slate-800/50 p-8 shadow-lg backdrop-blur-sm border border-slate-700/50 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 fade-in-up delay-200">
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
            </div>
          </div>
        </div>
      </div>
      {/* CTA Section */}
      <div className="relative isolate overflow-hidden py-16 sm:py-24">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 opacity-90"></div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="fade-in-up">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to Transform Your Learning Experience?
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-purple-100">
                Join thousands of students who are already benefiting from
                AI-powered learning assistance.
              </p>
              <div className="mt-10">
                <Link href="/ai-tutor">
                  <button className="group relative rounded-xl bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 px-8 py-4 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    <span className="relative z-10 flex items-center font-semibold">
                      Get Started Now
                      <ArrowRight className="ml-2 inline-block h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </span>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 opacity-0 transition-opacity group-hover:opacity-100"></div>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
