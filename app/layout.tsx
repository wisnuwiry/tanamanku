import "./globals.css";
import PageWrapper from "./components/PageWrapper";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { Merriweather } from "next/font/google";
import { Inter } from "next/font/google";
import { Providers } from "./providers";

const interSans = Inter({
  display: "swap",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const merriewatherSerif = Merriweather({
  weight: ["300", "400", "700", "900"],
  variable: "--font-merriweather",
  subsets: ['latin']
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Providers>
        <body
          className={`${interSans.variable} ${merriewatherSerif.variable} bg-background font-sans	antialiased`}
        >
          <Navbar />
          <PageWrapper>{children}</PageWrapper>
          <Footer />
        </body>
      </Providers>
    </html>
  );
}
