"use client";
import { createTheme } from "@mui/material/styles";

import React, { createContext, useEffect, useState } from "react";

import ThemeRegistry from "@/themes/ThemeRegistry";

export const CustomThemeContext = createContext<ThemeContext>({
  isDarkMode: false,
  toggleMode: () => {},
  modeHandler: (mode: "dark" | "light") => {},
});

export default function CustomThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  // const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
  //   if (typeof window !== "undefined") {
  //     const savedMode = localStorage.getItem("vm-football-darkmode");
  //     if (!savedMode) {

  //       return false;
  //     }

  //     return JSON.parse(savedMode);
  //   }

  //   return false;
  // });

  const themeValue = isDarkMode ? "dark" : "light";

  const theme = createTheme({
    palette: {
      mode: themeValue,
    },
  });

  useEffect(() => {
    const savedMode = localStorage.getItem("vm-football-darkmode");

    if (!savedMode) {
      return;
    }

    setIsDarkMode(JSON.parse(savedMode));
  }, []);

  const toggleMode = () => {
    setIsDarkMode((isDarkMode) => {
      localStorage.setItem("vm-football-darkmode", JSON.stringify(!isDarkMode));
      return !isDarkMode;
    });
  };

  const modeHandler = (mode: "dark" | "light") => {
    if (mode === "dark") {
      setIsDarkMode(true);
      localStorage.setItem("vm-football-darkmode", JSON.stringify(true));
    }

    if (mode === "light") {
      setIsDarkMode(false);
      localStorage.setItem("vm-football-darkmode", JSON.stringify(false));
    }
  };

  const providerValue = { isDarkMode, toggleMode, modeHandler };

  return (
    <CustomThemeContext.Provider value={providerValue}>
      <ThemeRegistry theme={theme} options={{ key: "mui" }}>
        {children}
      </ThemeRegistry>
    </CustomThemeContext.Provider>
  );
}
