import type { Metadata } from "next";
import ClientProviders from "../components/ClientProviders";

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
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
