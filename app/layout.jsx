import localFont from "next/font/local";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Navbar from './components/Navbar';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
  style: "normal",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
  style: "normal",
});

export const metadata = {
  title: "TZElectro | Modern E-Commerce",
  description: "Shop high-quality LED lighting products with a seamless experience.",
  keywords: ["LED strips", "LED bars", "infinity cubes", "smart lighting", "modern e-commerce"],
  authors: [{ name: "TZElectro Team" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  themeColor: "#363636",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-tap-highlight" content="no" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-[#363636] text-white`}
      >
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 3000,
            style: {
              background: "#0091FF",
              color: "#fff",
            },
          }}
        />

        <NextUIProvider>
          <Navbar />
          {children}
        </NextUIProvider>
      </body>
    </html>
  );
}
