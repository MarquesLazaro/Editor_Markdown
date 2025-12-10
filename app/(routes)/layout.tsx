import type { Metadata } from "next";
import ClientProviders from "../components/ClientProviders";
import ThemeProvider from "../context/ThemeContext";

export const metadata: Metadata = {
  title: "Editor de Markdown",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body>
        <ThemeProvider>
          <ClientProviders>{children}</ClientProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
