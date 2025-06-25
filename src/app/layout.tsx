import type { Metadata } from "next";
import "./globals.css";
import { I18nProvider } from "@/shared/components/I18nProvider/I18nProvider";

export const metadata: Metadata = {
  title: "Argedis",
  description: "Application Argedis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
