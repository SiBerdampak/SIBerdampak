import type { Metadata } from "next";
import "./globals.css";
import LoadingScreen from "@/components/loading-screen";
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
          <Navbar />
          {children}
      </body>
    </html>
  );
}
