"use client";

import { I18nextProvider } from "react-i18next";
import { useState, createContext, useContext, ReactNode } from "react";
import i18n from "@/i18n/i18n";

interface I18nContextType {
  language: string;
  setLanguage: (lang: string) => void;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState("fr");

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage }}>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </I18nContext.Provider>
  );
}
