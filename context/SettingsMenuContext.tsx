"use client";

import { createContext, useState } from "react";

export const SettingsMenuContext = createContext<ISettingsMenuContext>({
  openSettings: false,
  toggleSettingsOpen: () => {},
});

export default function SettingsMenuProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openSettings, setOpenSettings] = useState<boolean>(false);

  const toggleSettingsOpen = () => {
    setOpenSettings((open) => !open);
  };

  const providerValue = { openSettings, toggleSettingsOpen };

  return (
    <SettingsMenuContext.Provider value={providerValue}>
      {children}
    </SettingsMenuContext.Provider>
  );
}
