import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Adidas",
  description: "An ecommerce platform for Adidas shoes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jost.className}`}>
        {children}
      </body>
    </html>
  );
}
