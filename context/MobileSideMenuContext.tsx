"use client";

import { createContext, useEffect, useState } from "react";

export const MobileSideMenuContext = createContext<IMobileSideMenu>({
  open: false,
  toggleOpen: () => {},
});

export default function MobileSideMenuProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState<boolean>(false);

  const toggleOpen = () => {
    setOpen((open) => !open);
  };

  useEffect(() => {
    const resizeHandler = () => {
      if (window.innerWidth >= 900) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  const providerValue = { open, toggleOpen };

  return (
    <MobileSideMenuContext.Provider value={providerValue}>
      {children}
    </MobileSideMenuContext.Provider>
  );
}
