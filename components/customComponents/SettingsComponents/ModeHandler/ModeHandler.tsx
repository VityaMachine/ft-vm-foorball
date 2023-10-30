"use client";

import { useContext } from "react";

import { CustomThemeContext } from "@/context/CustomThemeContext";
import { LanguageContext } from "@/context/LanguageContext";

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { Typography } from "@mui/material";

import textContentData from "./textContentData.json";

export default function ModeHandler() {
  const { language } = useContext(LanguageContext);
  const { isDarkMode, modeHandler } = useContext(CustomThemeContext);

  return (
    <ButtonGroup orientation="vertical" fullWidth>
      <Button
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
        onClick={() => {
          modeHandler("light");
        }}
        variant={!isDarkMode ? "contained" : 'outlined'}
      >
        <WbSunnyIcon />
        <Typography sx={{ ml: "10px" }}>
          {language === "ua"
            ? textContentData.ua.btnLight
            : textContentData.en.btnLight}
        </Typography>
      </Button>
      <Button
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
        onClick={() => {
          modeHandler("dark");
        }}
        variant={isDarkMode ? "contained" : 'outlined'}

      >
        <DarkModeIcon />
        <Typography sx={{ ml: "10px" }}>
          {language === "ua"
            ? textContentData.ua.btnDark
            : textContentData.en.btnDark}
        </Typography>
      </Button>
    </ButtonGroup>
  );
}
