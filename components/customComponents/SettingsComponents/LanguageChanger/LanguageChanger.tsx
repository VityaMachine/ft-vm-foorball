"use client";

import React, { useContext } from "react";

import Image from "next/image";

import styled from "styled-components";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

import flagUA from "@/images/langFlags/ukr.svg";
import flagEN from "@/images/langFlags/eng.svg";

import { LanguageContext } from "@/context/LanguageContext";

import textContentData from "./textContentData.json";
import { Typography } from "@mui/material";

export default function LanguageChanger() {
  const { language, changeLanguageHandler } = useContext(LanguageContext);

  return (
    <ButtonGroup orientation="vertical" fullWidth color="info">
      <Button
        onClick={() => {
          changeLanguageHandler("ua");
        }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
        variant={language === "ua" ? "contained" : "outlined"}
      >
        <Image src={flagUA} alt="ua" />

        <Typography sx={{ ml: "10px" }}>
          {language === "ua"
            ? textContentData.ua.buttonUA
            : textContentData.en.buttonUA}
        </Typography>
      </Button>
      <Button
        onClick={() => {
          changeLanguageHandler("en");
        }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
        variant={language === "en" ? "contained" : "outlined"}
      >
        <Image src={flagEN} alt="EN" />
        <Typography sx={{ ml: "10px" }}>
          {language === "ua"
            ? textContentData.ua.buttonEN
            : textContentData.en.buttonEN}
        </Typography>
      </Button>
    </ButtonGroup>
  );
}
