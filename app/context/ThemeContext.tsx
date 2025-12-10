"use client";
import {
  ReactNode,
  useContext,
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { Theme } from "../types/Theme";

interface ThemeProviderProps {
  children: ReactNode;
}

interface ThemeContextProps {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: "light",
  setTheme: () => {},
});

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const local = localStorage.getItem("theme") as Theme;

    if (local) {
      setTheme(local);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme, setTheme]);

  const value = { theme, setTheme };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const themeContext = useContext(ThemeContext);

  return themeContext;
};

export default ThemeProvider;
