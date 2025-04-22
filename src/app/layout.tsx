import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

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
    "AI Tutor helps students of all ages learn effectively with personalized tutoring across subjects like math, science, history, and more. Get instant answers and study guidance.",
  keywords:
    "AI tutor, online learning, education, homework help, study assistant, personalized learning, academic support, tutoring, learning companion",
  authors: [{ name: "AI Tutor Team" }],
  creator: "AI Tutor",
  publisher: "AI Tutor",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "AI Tutor - Your Personal Learning Companion",
    description:
      "Get instant help with your studies from our AI tutor. Covers all subjects and learning levels.",
    url: "https://ai-tutor.com",
    siteName: "AI Tutor",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AI Tutor - Your Personal Learning Companion",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Tutor - Your Personal Learning Companion",
    description:
      "Get instant help with your studies from our AI tutor. Covers all subjects and learning levels.",
    images: ["/twitter-image.jpg"],
    creator: "@ai_tutor",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {" "}
        {/* Navbar */}
        <Navbar />
        {children}
      </body>
    </html>
  );
}
