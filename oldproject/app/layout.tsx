import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import { Nexa, NexaBold } from "../utils/customFonts";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Argedis",
  description: "Argedis",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=800, height=1920, initial-scale=1.0"
        />
      </Head>
      <html lang="en">
        <body
          className={`${Nexa.variable} ${NexaBold.variable} inter.className`}
          id="app-container"
        >
          <Script src="/script.js" />
          <Script src="/script2.js" />
          {children}
        </body>
      </html>
    </>
  );
}
