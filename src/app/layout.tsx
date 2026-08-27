import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "MORT // HEAVYWEIGHT URBAN STREETWEAR SYSTEM",
  description: "MORT is an independent streetwear brand. Premium 500GSM hoodies, technical cargos, acid-wash graphics, and utility gear.",
  keywords: ["streetwear", "MORT", "heavyweight hoodie", "cargo pants", "techwear", "gothic streetwear"],
  openGraph: {
    title: "MORT // HEAVYWEIGHT URBAN STREETWEAR SYSTEM",
    description: "Drop 04 // Oblivion now live. Worldwide express shipping.",
    images: ["/images/hero/hero-01.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-white min-h-screen flex flex-col antialiased selection:bg-primary selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
