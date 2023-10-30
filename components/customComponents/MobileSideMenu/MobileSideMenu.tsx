"use client";

import { useContext } from "react";

import { MobileSideMenuContext } from "@/context/MobileSideMenuContext";

import { Box, Divider, Drawer, Typography } from "@mui/material";

export default function MobileSideMenu() {
  const { open, toggleOpen } = useContext(MobileSideMenuContext);

  return (
    <Drawer
      open={open}
      onClose={toggleOpen}
      sx={{
        display: {
          xs: "block",
          md: "none",
        },
        scrollbarWidth: 0,
      }}
    >
      <Box
        sx={{
          width: {
            xs: "255px",
            sm: "270px",
          },
        }}
      >
        {/* Title */}

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
            <Typography variant="h4" color="#1A7AD1">
              V
            </Typography>
            <Typography variant="h4" color="yellow">
              M
            </Typography>
            <Typography variant="h5" color="#fff">
              Fooball
            </Typography>
          </Box>
        </Box>

        <Divider />

        {/* menu */}
        <Box>
          <ul>
            <li>List item first</li>
            <li>List item</li>
            <li>List item</li>
            <li>List item</li>
            <li>List item</li>
            <li>List item</li>
            <li>List item</li>
            <li>List item</li>
            <li>List item</li>
            <li>List item</li>
            <li>List item</li>
            <li>List item</li>
            <li>List item</li>
            <li>List item</li>
            <li>List item</li>
            <li>List item</li>
            <li>List item</li>
            <li>List item</li>
            <li>List item</li>
            <li>List item</li>
            <li>List item</li>
            <li>List item</li>
            <li>List item</li>
            <li>List item</li>
            <li>List item</li>
            <li>List item</li>
            <li>List item</li>
            <li>List item</li>
            <li>List item</li>
            <li>List item</li>
            <li>List item</li>
            <li>List item</li>
            <li>List item</li>
            <li>List item</li>
            <li>List item</li>
            <li>List item</li>
            <li>List item</li>
            <li>List item</li>
            <li>List item last</li>
          </ul>
        </Box>

        {/* settings container */}
        <Divider />
      </Box>
    </Drawer>
  );
}
