"use client";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { getTheme } from "../config/theme";
import DocumentsProvider from "../context/DocumentsContext";
import { useThemeContext } from "../context/ThemeContext";

type ClientProvidersProps = {
  children: React.ReactNode;
};

export default function ClientProviders({ children }: ClientProvidersProps) {
  const { theme } = useThemeContext();

  return (
    <ThemeProvider theme={getTheme(theme)}>
      <CssBaseline />
      <DocumentsProvider>{children}</DocumentsProvider>
    </ThemeProvider>
  );
}
