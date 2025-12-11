import type { Metadata } from "next";
import ClientProviders from "../components/ClientProviders";
import ThemeProvider from "../context/ThemeContext";
import EditorProvider from "../context/EditorContext";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

export const metadata: Metadata = {
  title: "Editor de Markdown",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider>
            <EditorProvider>
              <ClientProviders>{children}</ClientProviders>
            </EditorProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
