import type { Metadata } from "next";
import ClientProviders from "../components/ClientProviders";
import ThemeProvider from "../context/ThemeContext";

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
      <body>
        <ThemeProvider>
          <ClientProviders>{children}</ClientProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
