import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Providers from "@/components/providers/Providers";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#0a0e1a",
};

export const metadata: Metadata = {
  title: "Athlete Speaking Network | Book Athletes. Learn From Their Stories.",
  description:
    "Connect with inspiring athletes for your events or stream exclusive content anytime. Book speakers for keynotes, workshops, and more.",
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Athlete Network",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="flex min-h-dvh flex-col">
        <Providers>
          <Navbar />
          <main className="min-h-0 flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
