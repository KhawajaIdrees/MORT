import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "MORT",
  description: "MORT is an independent streetwear brand. Premium 500GSM hoodies, technical cargos, acid-wash graphics, and utility gear.",
  keywords: ["streetwear", "MORT", "heavyweight hoodie", "cargo pants", "techwear", "gothic streetwear"],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "MORT",
    description: "MORT Editorial Storefront.",
    images: ["/images/about/about-hoodie.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.png?v=2" type="image/png" />
        <link rel="shortcut icon" href="/favicon.ico?v=2" />
        <link rel="apple-touch-icon" href="/favicon.png?v=2" />
      </head>
      <body className="bg-background text-white min-h-screen flex flex-col antialiased selection:bg-primary selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
