import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TronGrid from "@/components/TronGrid";

// ──────────────────────────────────────────────────────────────
// SITE IDENTITY - change these to update the browser tab name,
// description, and favicon across the whole site.
// ──────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Sandy | Embedded Software Engineer",
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
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "64x64" },
      { url: "/icon-256.png", type: "image/png", sizes: "256x256" },
    ],
    apple: "/icon-256.png",
  },
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
        <link
          href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=JetBrains+Mono:wght@400;500;600&family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-surface-dark text-gray-200 relative">
        <ThemeProvider>
          <TronGrid />
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
