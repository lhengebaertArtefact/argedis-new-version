"use client";

import { useTranslation } from "react-i18next";
import { useI18n } from "../I18nProvider/I18nProvider";

export default function LanguageToggle() {
  const { t } = useTranslation();
  const { language, setLanguage } = useI18n();

  const toggleLanguage = () => {
    setLanguage(language === "fr" ? "en" : "fr");
  };

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-4 right-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors z-50"
      title={language === "fr" ? "Switch to English" : "Passer en français"}
    >
      {language === "fr"
        ? t("navigation.switchToEnglish")
        : t("navigation.switchToFrench")}
    </button>
  );
}
