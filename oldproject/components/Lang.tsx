"use client";
/* eslint-disable @next/next/no-img-element */

import frenchFlag from "../public/frenchFlag.png";
import englishFlag from "../public/englishFlag.png";
import { LANG_FR } from "@/constants/constants";

const Lang = ({
  imageError,
  currentLang,
  handleImageError,
}: {
  imageError: boolean;
  currentLang: string;
  handleImageError: () => void;
}) => {
  return (
    <div className="flex items-center ">
      {imageError ? (
        <div className="w-full h-full bg-white"></div>
      ) : (
        <img
          className="mr-4"
          src={currentLang === LANG_FR ? englishFlag.src : frenchFlag.src}
          alt=""
          onError={handleImageError}
        />
      )}
      {currentLang === LANG_FR ? "English version" : "Version française"}
    </div>
  );
};

export default Lang;
