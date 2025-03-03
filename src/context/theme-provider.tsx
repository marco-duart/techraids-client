import React, { createContext, useContext, ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { themes, ThemeType, ThemeMode } from '../assets/styles/theme';

interface ThemeContextProps {
  themeType: ThemeType;
  themeMode: ThemeMode;
  setThemeType: (type: ThemeType) => void;
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
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
  defaultThemeType = 'narrator',
  defaultThemeMode = 'light',
}: ThemeProviderProps) => {
  const [themeType, setThemeType] = React.useState<ThemeType>(defaultThemeType);
  const [themeMode, setThemeMode] = React.useState<ThemeMode>(defaultThemeMode);

  const theme = themes[themeType][themeMode];

  return (
    <ThemeContext.Provider value={{ themeType, themeMode, setThemeType, setThemeMode }}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};