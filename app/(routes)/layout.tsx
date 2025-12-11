import type { Metadata } from "next";
import ClientProviders from "../components/ClientProviders";
import ThemeProvider from "../context/ThemeContext";
import EditorProvider from "../context/EditorContext";

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
          <EditorProvider>
            <ClientProviders>{children}</ClientProviders>
          </EditorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
