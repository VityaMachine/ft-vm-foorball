import React from "react";

import CustomThemeProvider from "@/context/CustomThemeContext";
import LanguageProvider from "@/context/LanguageContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CustomThemeProvider>
      <LanguageProvider>{children}</LanguageProvider>
    </CustomThemeProvider>
  );
}
