import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import LoadingScreen from "@/components/loading-screen";
import PageTransition from "@/components/page-transition";

const birdsOfParadise = localFont({
  src: "/fonts/Birds_of_Paradise.ttf",
  variable: "--font-birds-of-paradise",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SI Berdampak",
  description: "Developed by SI Berdampak team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${birdsOfParadise.variable} ${birdsOfParadise.variable} antialiased`}
      >
        <LoadingScreen />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
