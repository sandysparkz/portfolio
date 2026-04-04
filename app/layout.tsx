import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TronGrid from "@/components/TronGrid";

export const metadata: Metadata = {
  title: "[Your Name] — Embedded Software Engineer",
  description:
    "Portfolio and blog of an Embedded Software Engineer specialising in Zephyr RTOS, Embedded Linux, and low-level C programming.",
  keywords: [
    "Embedded Software",
    "Zephyr RTOS",
    "Embedded Linux",
    "C Programming",
    "ARM",
    "IoT",
    "Firmware",
    "RTOS",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Share Tech Mono: terminal label feel; JetBrains Mono: code; Inter: body */}
        <link
          href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=JetBrains+Mono:wght@400;500;600&family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-surface-dark text-gray-200 relative">
        <ThemeProvider>
          {/* Tron grid canvas: fixed behind everything, home page only */}
          <TronGrid />

          {/* All page content sits above canvas via relative z-index */}
          <div className="relative z-10">
            <Navbar />
            <main>{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
