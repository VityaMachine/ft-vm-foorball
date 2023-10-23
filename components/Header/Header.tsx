import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import Search from "../HeaderFooterComponents/HeaderComponents/Search/Search";

import Image from "next/image";
import logo from "@/images/logo.png";
import ModeSwitcher from "../HeaderFooterComponents/HeaderComponents/ModeSwitcher/ModeSwitcher";
import Link from "next/link";
import LanguageChanger from "../HeaderFooterComponents/HeaderComponents/LanguageChanger/LanguageChanger";

export default function Header() {
  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: "#0F1924",
        height: {
          xs: "56px",
          sm: "90px",
        }
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: {
            xs: "row-reverse",
            md: "row",
          },
        }}
      >
        {/* logo */}
        <Box
          sx={{
            display: "flex",
            ml: {
              xs: "22px",
            },
            alignItems: "center",
            width: {
              md: "33%",
            },
          }}
        >
          <Link href="/" className="flex items-center">
            <Box
              sx={{
                height: {
                  xs: "56px",
                  sm: "90px",
                },
                minWidth: "56px",
                display: { xs: "flex", sm: "block" },
              }}
            >
              <Image
                src={logo}
                alt="logo"
                className="w-auto h-full object-cover"
                priority
              />
            </Box>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", md: "block" } }}
            >
              VM FOOTBALL
            </Typography>
          </Link>
        </Box>

        {/* search */}
        <Search />

        {/* mode switcher */}
        <Box
          sx={{
            display: {
              xs: "none",
              md: "flex",
            },
            width: {
              md: "33%",
            },
            justifyContent: "flex-end",
            alignItems: "center",
            mt: "5px",
          }}
        >
          <LanguageChanger />
          <ModeSwitcher />
        </Box>

        <Box
          sx={{
            display: {
              xs: "flex",
              md: "none",
            },

            width: {
              md: "33%",
            },
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
