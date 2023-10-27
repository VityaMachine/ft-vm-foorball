"use client";

import { useContext } from "react";

import { SettingsMenuContext } from "@/context/SettingsMenuContext";

import { Box, Drawer, Typography, Divider } from "@mui/material";
import LanguageChanger from "../SettingsComponents/LanguageChanger/LanguageChanger";
import ModeSwitcher from "../SettingsComponents/ModeSwitcher/ModeSwitcher";

export default function SettingsSideMenu() {
  const { openSettings, toggleSettingsOpen } = useContext(SettingsMenuContext);

  return (
    <Drawer anchor="right" open={openSettings} onClose={toggleSettingsOpen}>
      <Box
        sx={{
          width: {
            xs: "230px",
            sm: "270px",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: {
              xs: "56px",
              sm: "90px",
            },
            bgcolor: "#0F1924",
            position: "sticky",
            top: 0,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
             <Typography variant="h5" color="#fff">Settings</Typography>
          </Box>
        </Box>

        <Divider />

        {/* menu */}
        <Box>
            <LanguageChanger />
            <ModeSwitcher />
        </Box>
        
      </Box>
    </Drawer>
  );
}
