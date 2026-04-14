import { createContext, useContext, useEffect, useState } from "react";
import { readStorage, storageKeys, writeStorage } from "../utils/storage";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(
    () => readStorage(storageKeys.theme, "light") === "dark"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    writeStorage(storageKeys.theme, isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
