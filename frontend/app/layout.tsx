import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SocketProvider from "@/components/SocketProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Travelie",
  description: "Trip booking app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
        <body className={inter.className}>{children}</body>
      
    </html>
  );
}
