"use client";

import { createContext, useState, useEffect } from "react";

export const LanguageContext = createContext<ILangProviderValue>({
  language: "ua",
  changeLanguageHandler: (lang: LangStateType) => {},
});

export default function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [language, setLanguage] = useState<LangStateType>("ua");

  useEffect(() => {
    const savedLang = localStorage.getItem("vm-football-lang");

    if (!savedLang) {
      return;
    }

    setLanguage(JSON.parse(savedLang));
  }, []);

  const changeLanguageHandler = (lang: LangStateType) => {
    setLanguage(lang);
    localStorage.setItem("vm-football-lang", JSON.stringify(lang));
  };

  const providerValue = { language, changeLanguageHandler };

  return (
    <LanguageContext.Provider value={providerValue}>
      {children}
    </LanguageContext.Provider>
  );
}
