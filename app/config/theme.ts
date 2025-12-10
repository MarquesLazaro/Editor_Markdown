import { createTheme } from "@mui/material/styles";

const primaryColor = "#1976D2";
const secondaryColor = "#DC004E";

export const theme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: primaryColor,
        light: "#4791db",
        dark: "#115293",
        contrastText: "#FFFFFF",
      },
      secondary: {
        main: secondaryColor,
        contrastText: "#FFFFFF",
      },

      ...(mode === "light"
        ? {
            background: {
              default: "#F7F7F7",
              paper: "#FFFFFF",
            },
            text: {
              primary: "#1A1A1A",
              secondary: "#555555",
            },
          }
        : {
            background: {
              default: "#121212",
              paper: "#1E1E1E",
            },
            text: {
              primary: "#FFFFFF",
              secondary: "#BBBBBB",
            },
          }),
    },

    typography: {
      fontFamily: "Roboto, Arial, sans-serif",
      h1: {
        fontSize: "2.4rem",
        fontWeight: 600,
      },
      h2: {
        fontSize: "1.8rem",
        fontWeight: 500,
      },
      button: {
        textTransform: "none",
        fontWeight: 500,
      },
    },

    shape: {
      borderRadius: 3,
    },

    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            paddingInline: "1.2rem",
            paddingBlock: "0.4rem",
            borderRadius: 8,
            fontWeight: 500,
          },
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            ...(mode === "light"
              ? { boxShadow: "0 3px 12px rgba(0,0,0,0.10)" }
              : { boxShadow: "0 3px 12px rgba(0,0,0,0.40)" }),
          },
        },
      },

      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 14,
            padding: "1rem",
          },
        },
      },

      MuiToolbar: {
        styleOverrides: {
          root: {
            minHeight: 48,
            "@media (min-width:600px)": {
              minHeight: 48,
            },
          },
        },
      },

      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiInputBase-input": {
              fontSize: "1rem",
            },
          },
        },
      },
    },
  });
