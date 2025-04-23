import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/contexts/AuthContext";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Tutor - Your Personal Learning Companion",
  description:
    "Experience personalized learning with our advanced AI tutor. Get instant help with any subject, improve your study skills, and achieve your academic goals.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white`}
      >
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <main className="flex-1">
              {" "}
              <Navbar />
              {children}
            </main>
          </div>
          <Toaster position="top-center" />
        </AuthProvider>
      </body>
    </html>
  );
}
