export const themes = {
  narrator: {
    light: {
      primary: "#ffffff",
      secondary: "#f0f0f0",
      text: "#333333",
      accent: "#007bff",
      border: "#dddddd",
      shadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      background: "",
    },
    dark: {
      primary: "#1a1a1a",
      secondary: "#2d2d2d",
      text: "#f0f0f0",
      accent: "#007bff",
      border: "#444444",
      shadow: "0 4px 6px rgba(255, 255, 255, 0.1)",
      background: "",
    },
  },
  character: {
    light: {
      primary: "#f4e9d8",
      secondary: "#e0c9a6",
      text: "#3e2723",
      accent: "#8b5e3c",
      border: "#a1887f",
      texture: 'url("path/to/light-texture.jpg")',
      shadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
      background: "",
    },
    dark: {
      primary: "#2c1f1a",
      secondary: "#3e2c24",
      text: "#f0e6d2",
      accent: "#6d4c41",
      border: "#5d4037",
      texture: 'url("path/to/dark-texture.jpg")',
      shadow: "0 4px 6px rgba(255, 255, 255, 0.2)",
      background: "",
    },
  },
  auth: {
    light: {
      primary: "#f4e9d8",
      secondary: "#e0c9a6",
      text: "#3e2723",
      accent: "#8b5e3c",
      border: "#a1887f",
      shadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
      themeMode: "light",
    },
    dark: {
      primary: "#1a1a1a",
      secondary: "#2d2d2d",
      text: "#f0f0f0",
      accent: "#b22222",
      border: "#444444",
      shadow: "0 4px 6px rgba(255, 255, 255, 0.1)",
      themeMode: "dark",
    },
  },
};

export type ThemeType = keyof typeof themes;
export type ThemeMode = "light" | "dark";
