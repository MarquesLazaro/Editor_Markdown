// theme.ts
import { createTheme } from "@mui/material/styles";

const primaryColor = "#1976D2"; 
const secondaryColor = "#DC004E"; 

const theme = createTheme({
  palette: {
    mode: "light",

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

    background: {
      default: "#FFFFFF",
      paper: "#F5F5F5", 
    },

    text: {
      primary: "#212121", 
      secondary: "#757575", 
    },
  },

  typography: {
    fontFamily: "Roboto, Arial, sans-serif", 
    h1: {
      fontSize: "2.5rem",
      fontWeight: 500,
    },
    button: {
      textTransform: "none", 
    },
  },
});

export default theme;
