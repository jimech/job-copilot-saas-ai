import type { Metadata } from "next";
import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants/app";
import "./globals.css";

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased font-sans">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
