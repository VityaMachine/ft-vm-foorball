"use client";

import { useContext } from "react";

import { SettingsMenuContext } from "@/context/SettingsMenuContext";

import {
  Box,
  Drawer,
  Typography,
  Divider,
  Container,
  IconButton,
} from "@mui/material";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import LanguageChanger from "../SettingsComponents/LanguageChanger/LanguageChanger";
import ModeHandler from "../SettingsComponents/ModeHandler/ModeHandler";

export default function SettingsSideMenu() {
  const { openSettings, toggleSettingsOpen } = useContext(SettingsMenuContext);

  return (
    <Drawer anchor="right" open={openSettings} onClose={toggleSettingsOpen}>
      <Box
        sx={{
          width: {
            xs: "260px",
            sm: "270px",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
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
          <Container sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>

          <Typography
            variant="h5"
            color="#fff"
            // sx={{
            //   ml: "24px",
            // }}
          >
            Settings
          </Typography>

          <IconButton
            onClick={toggleSettingsOpen}
            // sx={{
            //   position: "absolute",
            //   top: "8px",
            //   right: "8px",
            // }}
          >
            <HighlightOffIcon
              fontSize="large"
              sx={{
                fill: "#fff",
              }}
            />
          </IconButton>
          </Container>
          
        </Box>

        <Divider />

        {/* menu */}
        <Box>
          <Container
            sx={{
              mt: "10px",
            }}
          >
            <Typography variant="subtitle1">Language</Typography>
            <LanguageChanger />
          </Container>

          <Container
            sx={{
              mt: "10px",
            }}
          >
            <Typography variant="subtitle1">Mode</Typography>

            <ModeHandler />
          </Container>
        </Box>
      </Box>
    </Drawer>
  );
}
