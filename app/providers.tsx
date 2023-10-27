import React from "react";

import SettingsMenuProvider from "@/context/SettingsMenuContext";
import MobileSideMenuProvider from "@/context/MobileSideMenuContext";
import CustomThemeProvider from "@/context/CustomThemeContext";
import LanguageProvider from "@/context/LanguageContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SettingsMenuProvider>
      <MobileSideMenuProvider>
        <CustomThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </CustomThemeProvider>
      </MobileSideMenuProvider>
    </SettingsMenuProvider>
  );
}
