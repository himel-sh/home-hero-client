import React, { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Always default to light mode on first visit
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "light";
  });

  useEffect(() => {
    const htmlElement = document.documentElement;

    // Remove both theme classes
    htmlElement.classList.remove("light", "dark");

    // Add the current theme class
    htmlElement.classList.add(theme);

    // Also set data-theme for DaisyUI
    htmlElement.setAttribute("data-theme", theme);

    // Save to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
