"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Send, Loader2, Book, Brain, Lightbulb } from "lucide-react";

type Message = {
  role: "human" | "ai";
  content: string;
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

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: userMessage,
          convHistory: messages.map((m) => m.content),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "ai", content: data.response }]);
    } catch (error) {
      console.error("Error getting chat response:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content:
            "I&apos;m sorry, there was an error processing your request. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white px-4 py-3 shadow-sm">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bot className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-semibold text-blue-900">AI Tutor</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Book className="h-4 w-4" />
              <span>Learning Made Easy</span>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mx-auto max-w-4xl space-y-6">
          {messages.length === 0 ? (
            <div className="flex h-[calc(100vh-200px)] flex-col items-center justify-center text-center">
              <div className="mb-8 flex space-x-4">
                <div className="rounded-full bg-blue-100 p-4">
                  <Brain className="h-8 w-8 text-blue-600" />
                </div>
                <div className="rounded-full bg-purple-100 p-4">
                  <Book className="h-8 w-8 text-purple-600" />
                </div>
                <div className="rounded-full bg-green-100 p-4">
                  <Lightbulb className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <h2 className="mb-4 text-3xl font-bold text-blue-900">
                Welcome to AI Tutor
              </h2>
              <p className="mb-6 max-w-md text-gray-600">
                Your personal AI learning companion. Ask me anything about:
              </p>
              <div className="grid grid-cols-2 gap-4 text-left">
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <h3 className="mb-2 font-semibold text-blue-900">
                    Academic Subjects
                  </h3>
                  <ul className="text-sm text-gray-600">
                    <li>• Mathematics</li>
                    <li>• Science</li>
                    <li>• History</li>
                    <li>• Literature</li>
                  </ul>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <h3 className="mb-2 font-semibold text-blue-900">
                    Learning Skills
                  </h3>
                  <ul className="text-sm text-gray-600">
                    <li>• Study Techniques</li>
                    <li>• Problem Solving</li>
                    <li>• Critical Thinking</li>
                    <li>• Research Methods</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "human" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.role === "human"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-800 shadow-sm"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg bg-white px-4 py-2 shadow-sm">
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                  <span className="text-gray-600">Thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Form */}
      <div className="border-t bg-white p-4">
        <form onSubmit={handleSubmit} className="mx-auto max-w-4xl">
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me anything about learning..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading || !inputValue.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
