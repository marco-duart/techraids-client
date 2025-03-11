import { createContext, useContext, ReactNode, useState } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { themes, ThemeType, ThemeMode } from "../assets/styles/theme";

interface ThemeContextProps {
  themeType: ThemeType;
  themeMode: ThemeMode;
  setThemeType: (type: ThemeType) => void;
  setThemeMode: (mode: ThemeMode) => void;
  updateThemeType: (role: string) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme deve ser usado dentro de um ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
  defaultThemeType?: ThemeType;
  defaultThemeMode?: ThemeMode;
}

export const ThemeProvider = ({
  children,
  defaultThemeType = "character",
  defaultThemeMode = "light",
}: ThemeProviderProps) => {
  const [themeType, setThemeType] = useState<ThemeType>(defaultThemeType);
  const [themeMode, setThemeMode] = useState<ThemeMode>(defaultThemeMode);

  const updateThemeType = (role: string) => {
    if (role === "narrator") {
      setThemeType("narrator");
    } else if (role === "character") {
      setThemeType("character");
    }
  };

  const theme = themes[themeType][themeMode];

  return (
    <ThemeContext.Provider
      value={{
        themeType,
        themeMode,
        setThemeType,
        setThemeMode,
        updateThemeType,
      }}
    >
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};
