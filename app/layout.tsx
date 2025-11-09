import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import LoadingScreen from "@/components/loading-screen";
import PageTransition from "@/components/page-transition";
import { GeistFont } from "@/lib/font";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";

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
      <body className={cn(GeistFont.variable)}>
        <LoadingScreen />
        <PageTransition>
          <Navbar />
          {children}
        </PageTransition>
      </body>
    </html>
  );
}
