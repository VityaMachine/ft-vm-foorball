"use client";

import { useContext } from "react";
import { MobileSideMenuContext } from "@/context/MobileSideMenuContext";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

export default function MobileMenuButton() {
  const { toggleOpen } = useContext(MobileSideMenuContext);

  return (
    <IconButton
      size="large"
      edge="start"
      color="inherit"
      aria-label="menu"
      sx={{ mr: 2 }}
      onClick={toggleOpen}
    >
      <MenuIcon />
    </IconButton>
  );
}
