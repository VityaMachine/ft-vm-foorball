"use client";

import { useContext } from "react";

import { SettingsMenuContext } from "@/context/SettingsMenuContext";

import { Box, IconButton, Button } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

export default function SettingsMenuButton() {
  const { toggleSettingsOpen } = useContext(SettingsMenuContext);

  return (
    <Box>
      <IconButton
        sx={{
          display: {
            xs: "inline-flex",
            md: "none",
          },
          ml: "12px",
          color: "#fff",
        }}
        onClick={toggleSettingsOpen}
      >
        <SettingsIcon
          sx={{
            fill: "#fff",
          }}
        />
      </IconButton>

      <Button
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
          color: "#fff",
        }}
        onClick={toggleSettingsOpen}
      >
        <SettingsIcon
          sx={{
            fill: "#fff",
          }}
        />
        Settings
      </Button>
    </Box>
  );
}
