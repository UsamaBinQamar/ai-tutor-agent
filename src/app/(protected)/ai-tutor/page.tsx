"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "framer-motion";
import { Book, Brain, Lightbulb, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Message = {
  role: "human" | "ai";
  content: string;
  isTyping?: boolean;
};

export default function AITutorPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue;
    setInputValue("");
    setMessages((prev) => [...prev, { role: "human", content: userMessage }]);
    setIsLoading(true);

    // Add a typing message immediately
    setMessages((prev) => [
      ...prev,
      { role: "ai", content: "", isTyping: true },
    ]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: userMessage,
          convHistory: messages
            .filter((m) => m.role === "human")
            .map((m) => m.content),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      // Remove the typing message and add the real response
      setMessages((prev) => {
        const filteredMessages = prev.filter((m) => !m.isTyping);
        return [...filteredMessages, { role: "ai", content: data.response }];
      });
    } catch (error) {
      console.error("Error getting chat response:", error);

      // Remove the typing message and add the error message
      setMessages((prev) => {
        const filteredMessages = prev.filter((m) => !m.isTyping);
        return [
          ...filteredMessages,
          {
            role: "ai",
            content:
              "I'm sorry, there was an error processing your request. Please try again.",
          },
        ];
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex flex-col">
      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto">
        <div className="relative px-4 py-6">
          <div className="mx-auto max-w-5xl space-y-6">
            {messages.length === 0 ? (
              <div className="flex h-[calc(100vh-200px)] flex-col items-center justify-center text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="space-y-8"
                >
                  <div className="mb-10 flex space-x-6 items-center justify-center">
                    <motion.div
                      className="rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 p-5 shadow-lg backdrop-blur-sm border border-purple-500/20"
                      whileHover={{ y: -5, scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Brain className="h-10 w-10 text-white" />
                    </motion.div>
                    <motion.div
                      className="rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 p-5 shadow-lg backdrop-blur-sm border border-indigo-500/20"
                      whileHover={{ y: -5, scale: 1.05 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        delay: 0.1,
                      }}
                    >
                      <Book className="h-10 w-10 text-white" />
                    </motion.div>
                    <motion.div
                      className="rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 p-5 shadow-lg backdrop-blur-sm border border-blue-500/20"
                      whileHover={{ y: -5, scale: 1.05 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        delay: 0.2,
                      }}
                    >
                      <Lightbulb className="h-10 w-10 text-white" />
                    </motion.div>
                  </div>
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
                    Welcome to AI Tutor
                  </h2>
                  <p className="text-lg text-gray-300">
                    Your personal AI learning companion. Ask me anything about:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left w-full max-w-3xl">
                    <motion.div
                      className="rounded-xl bg-slate-800/50 p-6 shadow-lg border border-purple-500/20 backdrop-blur-sm"
                      whileHover={{
                        y: -5,
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)",
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <h3 className="mb-3 text-xl font-semibold">
                        <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                          Academic Subjects
                        </span>
                      </h3>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-center">
                          <div className="mr-2 h-1.5 w-1.5 rounded-full bg-purple-500"></div>
                          Mathematics
                        </li>
                        <li className="flex items-center">
                          <div className="mr-2 h-1.5 w-1.5 rounded-full bg-purple-500"></div>
                          Science
                        </li>
                        <li className="flex items-center">
                          <div className="mr-2 h-1.5 w-1.5 rounded-full bg-purple-500"></div>
                          History
                        </li>
                        <li className="flex items-center">
                          <div className="mr-2 h-1.5 w-1.5 rounded-full bg-purple-500"></div>
                          Literature
                        </li>
                      </ul>
                    </motion.div>
                    <motion.div
                      className="rounded-xl bg-slate-800/50 p-6 shadow-lg border border-indigo-500/20 backdrop-blur-sm"
                      whileHover={{
                        y: -5,
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)",
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <h3 className="mb-3 text-xl font-semibold">
                        <span className="bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">
                          Learning Skills
                        </span>
                      </h3>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-center">
                          <div className="mr-2 h-1.5 w-1.5 rounded-full bg-indigo-500"></div>
                          Study Techniques
                        </li>
                        <li className="flex items-center">
                          <div className="mr-2 h-1.5 w-1.5 rounded-full bg-indigo-500"></div>
                          Problem Solving
                        </li>
                        <li className="flex items-center">
                          <div className="mr-2 h-1.5 w-1.5 rounded-full bg-indigo-500"></div>
                          Critical Thinking
                        </li>
                        <li className="flex items-center">
                          <div className="mr-2 h-1.5 w-1.5 rounded-full bg-indigo-500"></div>
                          Research Methods
                        </li>
                      </ul>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            ) : (
              <div className="space-y-6 pb-4">
                {messages.map((message, index) => (
                  <AnimatePresence key={index}>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${
                        message.role === "human"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-6 py-4 ${
                          message.role === "human"
                            ? "bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 text-white shadow-lg"
                            : "bg-slate-800/50 text-white shadow-lg border border-slate-700/50 backdrop-blur-sm"
                        }`}
                      >
                        {message.isTyping ? (
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-1">
                              <motion.div
                                className="h-3 w-3 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"
                                animate={{
                                  scale: [1, 1.2, 1],
                                  opacity: [0.7, 1, 0.7],
                                }}
                                transition={{
                                  duration: 1.2,
                                  repeat: Infinity,
                                  repeatType: "loop",
                                  delay: 0,
                                }}
                              />
                              <motion.div
                                className="h-3 w-3 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500"
                                animate={{
                                  scale: [1, 1.2, 1],
                                  opacity: [0.7, 1, 0.7],
                                }}
                                transition={{
                                  duration: 1.2,
                                  repeat: Infinity,
                                  repeatType: "loop",
                                  delay: 0.4,
                                }}
                              />
                              <motion.div
                                className="h-3 w-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                                animate={{
                                  scale: [1, 1.2, 1],
                                  opacity: [0.7, 1, 0.7],
                                }}
                                transition={{
                                  duration: 1.2,
                                  repeat: Infinity,
                                  repeatType: "loop",
                                  delay: 0.8,
                                }}
                              />
                            </div>
                            <motion.span
                              className="text-sm font-medium text-purple-400"
                              animate={{
                                opacity: [0.7, 1, 0.7],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "loop",
                              }}
                            >
                              AI Tutor is thinking...
                            </motion.span>
                          </div>
                        ) : (
                          <div className="prose prose-sm max-w-none prose-invert">
                            {message.content.split("\n").map((line, i) => (
                              <p key={i} className="mb-2 last:mb-0">
                                {line}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                ))}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Input Form */}
      <div className="sticky bottom-0 border-t border-slate-800/50 bg-slate-900/80 p-4 backdrop-blur-lg">
        <form onSubmit={handleSubmit} className="mx-auto max-w-5xl">
          <div className="flex space-x-3">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me anything about learning..."
              className="flex-1 rounded-xl border-slate-700 bg-slate-800/50 px-4 py-6 text-white placeholder-gray-400 focus-visible:ring-purple-500 focus-visible:border-purple-500"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="rounded-xl bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 px-6 py-6 hover:from-purple-600 hover:via-indigo-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
