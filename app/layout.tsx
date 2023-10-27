import "./globals.css";

import { Roboto } from "next/font/google";

import { Metadata } from "next";

import Providers from "./providers";

import Header from "@/components/Header/Header";
import { Box, Container, Drawer, Paper } from "@mui/material";
import MobileSideMenu from "@/components/customComponents/MobileSideMenu/MobileSideMenu";
import SettingsSideMenu from "@/components/customComponents/SettingsSideMenu/SettingsSideMenu";

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
                  sm: "calc(100vh - 90px)",
                },
                borderRadius: 0,
                display: "flex",
                top: {
                  xs: "56px",
                  sm: "90px",
                },
              }}
            >
              {/* left side menu desctop */}
              <Box
                sx={{
                  display: {
                    xs: "none",
                    md: "block",
                  },
                  bgcolor: "yellow",
                  height: {
                    xs: "calc(100vh - 56px)",
                    sm: "calc(100vh - 90px)",
                  },
                  width: "270px",
                  position: "fixed",
                }}
              >
                side menu
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
                  // maxWidth: "calc(100vw - 290px)",
                }}
              >
                <Container
                  maxWidth={false}
                  sx={{
                    maxWidth: {
                      xs: "100vw",
                      md: "calc(100vw - 290px)",
                    },
                  }}
                >
                  {children}
                </Container>
              </Box>
            </Paper>
          </main>
        </Providers>
      </body>
    </html>
  );
}
