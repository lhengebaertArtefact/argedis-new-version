"use client";

import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useI18n } from "../I18nProvider/I18nProvider";
import Lang from "../Lang/Lang";

export default function LanguageToggle() {
  const { i18n } = useTranslation();
  const { language, setLanguage } = useI18n();
  const [imageError, setImageError] = useState(false);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === "fr" ? "en" : "fr");
  };

  return (
    <button
      className="absolute top-[84px] right-[48px] z-2 bg-white rounded-full px-6 py-5 text-buttonToggleLangage font-nexaBold text-black z-[5]"
      onClick={toggleLanguage}
    >
      <Lang
        imageError={imageError}
        currentLang={language}
        handleImageError={handleImageError}
      />
    </button>
  );
}
