import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Collection of Tamang  Words - Tamang Dictionary",
  description: "Collection of Tamang  Words - Tamang Dictionary",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`d-flex flex-column min-vh-100`}>
        <Header />
        <SearchBar />
        <main className="d-flex flex-grow-1 container py-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
