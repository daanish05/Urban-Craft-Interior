import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Cursor from "@/components/ui/Cursor";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileCTA from "@/components/layout/MobileCTA";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Urban Craft Interior — Designed. Manufactured. Executed.",
  description:
    "UCI brings interior design, 3D visualization, furniture manufacturing and turnkey execution together in one integrated journey — from 3D to reality, from factory to home.",
  keywords: [
    "interior design",
    "interior designer Aurangabad",
    "modular kitchen",
    "furniture manufacturing",
    "turnkey interiors",
    "3D visualization",
    "home interiors",
  ],
  openGraph: {
    title: "Urban Craft Interior — Designed. Manufactured. Executed.",
    description:
      "From 3D to reality. Design, manufacturing and execution under one roof.",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#f3ede2] text-[#161513]">
        <SmoothScroll>
          <Cursor />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <MobileCTA />
        </SmoothScroll>
      </body>
    </html>
  );
}
