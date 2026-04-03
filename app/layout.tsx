import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "[Your Name] — Embedded Software Engineer",
  description:
    "Portfolio and blog of an Embedded Software Engineer specializing in Zephyr RTOS, Embedded Linux, and low-level C programming.",
  keywords: [
    "Embedded Software",
    "Zephyr RTOS",
    "Embedded Linux",
    "C Programming",
    "ARM",
    "IoT",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
