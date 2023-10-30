"use client";

import { useContext } from "react";

import { CustomThemeContext } from "@/context/CustomThemeContext";
import { LanguageContext } from "@/context/LanguageContext";
import { Box, Typography, Button } from "@mui/material";

import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import textContentData from "./textContentData.json";

export default function ModeSwitcher() {
  const { isDarkMode, toggleMode } = useContext(CustomThemeContext);
  const { language } = useContext(LanguageContext);

  const textContent =
    language === "ua" ? textContentData.ua : textContentData.en;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "111px",
      }}
    >
      <Button
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={() => {
          toggleMode();
        }}
      >
        <Typography
          sx={{
            // color: !isDarkMode ? "#fff" : "",
            fontSize: "14px",
          }}
        >
          {isDarkMode
            ? textContent.modeName.darkMode
            : textContent.modeName.lightMode}
        </Typography>
        {isDarkMode ? <DarkModeIcon /> : <WbSunnyIcon />}
      </Button>
    </Box>
  );
}
