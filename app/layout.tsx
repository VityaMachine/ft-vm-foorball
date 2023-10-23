import "./globals.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { Metadata } from "next";

import Providers from "./providers";

import Header from "@/components/Header/Header";
import { Paper } from "@mui/material";

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
      <body suppressHydrationWarning={true}>
        <Providers>
          <Header />
          <main>
            <Paper
              sx={{
                minHeight: {
                  xs: "calc(100vh - 56px)",
                  sm: "calc(100vh - 90px)",
                },
                borderRadius: 0,
              }}
            >
              {children}
            </Paper>
          </main>
        </Providers>
      </body>
    </html>
  );
}
