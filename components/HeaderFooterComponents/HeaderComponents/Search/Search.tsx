"use client";

import { useContext, useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

import { LanguageContext } from "@/context/LanguageContext";
import textContentData from "./textContentData.json";

export default function Search() {
  const [search, setSearch] = useState("");

  const { language } = useContext(LanguageContext);

  const textContent =
    language === "ua" ? textContentData.ua : textContentData.en;

  const submitHandler = (e: React.FormEvent): void => {
    e.preventDefault();

    console.log(search);
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const clearSearchHandler = (): void => {
    setSearch("");
  };

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        justifyContent: 'center',
        width: "100%",
        maxWidth: 450,
        bgcolor: "rgba(255, 255, 255, 0.15)",
      }}
      onSubmit={submitHandler}
    >
      <InputBase
        sx={{ ml: 1, flex: 1, color: "#fff" }}
        placeholder={textContent.searchInput.placeholder}
        value={search}
        onChange={changeHandler}
        onFocus={clearSearchHandler}
      />
      <IconButton type="submit" sx={{ p: "10px" }}>
        <SearchIcon sx={{ color: "#fff" }} />
      </IconButton>
    </Paper>
  );
}
