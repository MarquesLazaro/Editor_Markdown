import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import DocumentsProvider from "./context/DocumentsContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Editor de Markdown",
  description: "Editor de Markdown",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DocumentsProvider>{children}</DocumentsProvider>
      </body>
    </html>
  );
}
