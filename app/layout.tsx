import "./globals.css";

import { Roboto } from "next/font/google";

import { Metadata } from "next";

import Providers from "./providers";

import Header from "@/components/Header/Header";
import { Box, Container, Drawer, Paper } from "@mui/material";
import MobileSideMenu from "@/components/customComponents/MobileSideMenu/MobileSideMenu";
import SettingsSideMenu from "@/components/customComponents/SettingsSideMenu/SettingsSideMenu";
import DesktopMainMenu from "@/components/customComponents/DesktopMainMenu/DesktopMainMenu";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["cyrillic", "latin"],
});

export const metadata: Metadata = {
  title: "VMFootball",
  description: "Simple app to get football info",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className} suppressHydrationWarning={true}>
        <Providers>
          <Header />
          <main>
            <Paper
              sx={{
                position: "relative",
                minHeight: {
                  xs: "calc(100vh - 56px)",
                  md: "calc(100vh - 90px)",
                },
                borderRadius: 0,
                display: "flex",
                // top: {
                //   xs: "56px",
                //   md: "90px",
                // },
                overflow: 'hidden'
              }}
            >
              {/* left side menu desctop */}
              <Box
                sx={{
                  display: {
                    xs: "none",
                    md: "block",
                  },
           
                  height: {
                    xs: "calc(100vh - 56px)",
                    sm: "calc(100vh - 90px)",
                  },
                  width: "270px",
                  position: "fixed",
                  zIndex: 9999
                }}
              >
                <DesktopMainMenu />
              </Box>

              {/* mobile left side menu */}
              <Box
                sx={{
                  display: {
                    xs: "block",
                    md: "none",
                  },
                  
                }}
              >
                <MobileSideMenu />
              </Box>

              {/* right side settings menu */}
              <Box>
                <SettingsSideMenu />
              </Box>

              {/* main content */}
              <Box
                
                sx={{
                  position: "relative",
                  left: {
                    xs: 0,
                    md: "270px",
                  },
                  width: {
                    xs: "100vw",
                    md: "calc(100vw - 290px)",
                  },
                 
                }}
              >
                <Container>
                  <Box className="main-layout-children">
                  {children}
                  </Box>
                </Container>
              </Box>
            </Paper>
          </main>
        </Providers>
      </body>
    </html>
  );
}
