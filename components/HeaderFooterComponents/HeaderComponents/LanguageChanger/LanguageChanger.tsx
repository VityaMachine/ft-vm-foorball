"use client";

import React, { useContext } from "react";

import Image from "next/image";

import styled from "styled-components";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

import flagUA from "@/images/langFlags/ukr.svg";
import flagEN from "@/images/langFlags/eng.svg";

import { LanguageContext } from "@/context/LanguageContext";

const StyledButton = styled(Button)`
  &&& {
    &.Mui-disabled {
      background: #a8a8a8;
    }
  }
`;

export default function LanguageChanger() {
  const { language, changeLanguageHandler } = useContext(LanguageContext);

  return (
    <ButtonGroup sx={{}}>
      <StyledButton
        disabled={language === "ua"}
        onClick={() => {
          changeLanguageHandler("ua");
        }}
      >
        <Image src={flagUA} alt="ua" />
      </StyledButton>
      <StyledButton
        disabled={language === "en"}
        onClick={() => {
          changeLanguageHandler("en");
        }}
      >
        <Image src={flagEN} alt="EN" />
      </StyledButton>
    </ButtonGroup>
  );
}
