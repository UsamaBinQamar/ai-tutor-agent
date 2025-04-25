"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { Book, Bot, Brain, Lightbulb, Send, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Message = {
  role: "human" | "ai";
  content: string;
  isTyping?: boolean;
};

export default function AITutorPage() {
  const { isSubscribed } = useAuth();
  const router = useRouter();

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [streamingText, setStreamingText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!isSubscribed) {
      router.push("/");
    }
  }, [isSubscribed]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingText]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue;
    setInputValue("");
    setMessages((prev) => [...prev, { role: "human", content: userMessage }]);
    setIsLoading(true);

    // Add temporary typing message
    setMessages((prev) => [
      ...prev,
      { role: "ai", content: "", isTyping: true },
    ]);

    try {
      // Reset streaming text
      setStreamingText("");

      // Create the request
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

      // Get the response data
      const data = await response.json();

      // Remove typing indicator
      setMessages((prev) => prev.filter((m) => !m.isTyping));

      // Start the typing animation for the response
      const fullText = data.response;
      let currentIndex = 0;

      // Remove the temporary typing message
      setMessages((prev) => prev.filter((m) => !m.isTyping));

      // Add a new message for the streaming content
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "", isTyping: true },
      ]);

      // Simulate typing with a delay between characters
      const typingInterval = setInterval(() => {
        if (currentIndex < fullText.length) {
          const nextChar = fullText.charAt(currentIndex);
          setStreamingText((prev) => {
            // If this is the first character, ensure it's rendered immediately
            if (currentIndex === 0) {
              return nextChar;
            }
            return prev + nextChar;
          });
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          // Replace the typing message with the complete message
          setMessages((prev) => {
            const filteredMessages = prev.filter((m) => !m.isTyping);
            return [...filteredMessages, { role: "ai", content: fullText }];
          });
          setStreamingText("");
          setIsLoading(false);
        }
      }, 10); // Adjust typing speed here (milliseconds per character)
    } catch (error) {
      console.error("Error getting chat response:", error);
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
                <div className="space-y-8 fade-in">
                  <div className="mb-10 flex space-x-6 items-center justify-center">
                    <div className="icon-container animate-bounce">
                      <Brain className="h-10 w-10 text-white" />
                    </div>
                    <div
                      className="icon-container indigo animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    >
                      <Book className="h-10 w-10 text-white" />
                    </div>
                    <div
                      className="icon-container blue animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    >
                      <Lightbulb className="h-10 w-10 text-white" />
                    </div>
                  </div>
                  <h2 className="text-4xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                    Welcome to AI Tutor
                  </h2>
                  <p className="text-lg text-gray-300">
                    Your personal AI learning companion. Ask me anything about:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left w-full max-w-3xl">
                    <div className="card p-6 rounded-xl bg-slate-800/50 backdrop-blur-lg border border-slate-700 hover:border-purple-500 transition-all duration-300">
                      <h3 className="mb-3 text-xl font-semibold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                        Academic Subjects
                      </h3>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-center hover:text-purple-400 transition-colors duration-200">
                          <div className="mr-2 h-1.5 w-1.5 rounded-full bg-purple-500"></div>
                          Mathematics
                        </li>
                        <li className="flex items-center hover:text-purple-400 transition-colors duration-200">
                          <div className="mr-2 h-1.5 w-1.5 rounded-full bg-purple-500"></div>
                          Science
                        </li>
                        <li className="flex items-center hover:text-purple-400 transition-colors duration-200">
                          <div className="mr-2 h-1.5 w-1.5 rounded-full bg-purple-500"></div>
                          History
                        </li>
                        <li className="flex items-center hover:text-purple-400 transition-colors duration-200">
                          <div className="mr-2 h-1.5 w-1.5 rounded-full bg-purple-500"></div>
                          Literature
                        </li>
                      </ul>
                    </div>
                    <div className="card p-6 rounded-xl bg-slate-800/50 backdrop-blur-lg border border-slate-700 hover:border-purple-500 transition-all duration-300">
                      <h3 className="mb-3 text-xl font-semibold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                        Learning Skills
                      </h3>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-center hover:text-purple-400 transition-colors duration-200">
                          <div className="mr-2 h-1.5 w-1.5 rounded-full bg-indigo-500"></div>
                          Study Techniques
                        </li>
                        <li className="flex items-center hover:text-purple-400 transition-colors duration-200">
                          <div className="mr-2 h-1.5 w-1.5 rounded-full bg-indigo-500"></div>
                          Problem Solving
                        </li>
                        <li className="flex items-center hover:text-purple-400 transition-colors duration-200">
                          <div className="mr-2 h-1.5 w-1.5 rounded-full bg-indigo-500"></div>
                          Critical Thinking
                        </li>
                        <li className="flex items-center hover:text-purple-400 transition-colors duration-200">
                          <div className="mr-2 h-1.5 w-1.5 rounded-full bg-indigo-500"></div>
                          Research Methods
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6 pb-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === "human" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`message ${message.role} flex items-start space-x-3 max-w-3xl`}
                    >
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                          message.role === "human"
                            ? "bg-purple-500"
                            : "bg-indigo-500"
                        }`}
                      >
                        {message.role === "human" ? (
                          <User className="h-4 w-4 text-white" />
                        ) : (
                          <Bot className="h-4 w-4 text-white" />
                        )}
                      </div>
                      <div
                        className={`flex-1 p-4 rounded-xl ${
                          message.role === "human"
                            ? "bg-purple-500/20 border border-purple-500/30"
                            : "bg-slate-800/50 border border-slate-700"
                        }`}
                      >
                        {message.isTyping ? (
                          message.role === "ai" && streamingText ? (
                            <div className="prose prose-sm max-w-none prose-invert">
                              {streamingText.split("\n").map((line, i) => (
                                <p key={i} className="mb-2 last:mb-0">
                                  {line || " "}
                                </p>
                              ))}
                              <span className="typing-cursor">|</span>
                            </div>
                          ) : (
                            <div className="typing-indicator flex items-center">
                              <div className="typing-dot animate-bounce"></div>
                              <div
                                className="typing-dot animate-bounce"
                                style={{ animationDelay: "0.2s" }}
                              ></div>
                              <div
                                className="typing-dot animate-bounce"
                                style={{ animationDelay: "0.4s" }}
                              ></div>
                              <span className="text-sm font-medium text-purple-400 ml-2">
                                AI Tutor is thinking...
                              </span>
                            </div>
                          )
                        ) : (
                          <div className="prose prose-sm max-w-none prose-invert">
                            {message.content.split("\n").map((line, i) => (
                              <p key={i} className="mb-2 last:mb-0">
                                {line || " "}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {/* Render the currently streaming text if there is no typing message */}
                {streamingText && !messages.find((m) => m.isTyping) && (
                  <div className="flex justify-start">
                    <div className="message ai flex items-start space-x-3 max-w-3xl">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-indigo-500">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1 p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                        <div className="prose prose-sm max-w-none prose-invert">
                          {streamingText.split("\n").map((line, i) => (
                            <p key={i} className="mb-2 last:mb-0">
                              {line || " "}
                            </p>
                          ))}
                          <span className="typing-cursor">|</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
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
              className="flex-1 rounded-xl border-slate-700 bg-slate-800/50 px-4 py-6 text-white placeholder-gray-400 focus-visible:ring-purple-500 focus-visible:border-purple-500 transition-all duration-200"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="btn-gradient rounded-xl px-6 py-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </div>

      {/* Add CSS for typing cursor animation */}
      <style jsx global>{`
        .typing-dot {
          width: 6px;
          height: 6px;
          background-color: #a855f7;
          border-radius: 50%;
          margin-right: 4px;
        }

        .typing-cursor {
          display: inline-block;
          width: 2px;
          height: 1em;
          background-color: transparent;
          color: #a855f7;
          animation: blink 1s step-end infinite;
        }

        @keyframes blink {
          from,
          to {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
