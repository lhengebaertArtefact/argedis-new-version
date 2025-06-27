"use client";

interface LangProps {
  imageError: boolean;
  currentLang: string;
  handleImageError: () => void;
}

const Lang: React.FC<LangProps> = ({
  imageError,
  currentLang,
  handleImageError,
}) => {
  return (
    <div className="flex items-center">
      {imageError ? (
        <div className="w-full h-full bg-white"></div>
      ) : (
        <img
          className="mr-4"
          src={currentLang === "fr" ? "/englishFlag.png" : "/frenchFlag.png"}
          alt=""
          onError={handleImageError}
        />
      )}
      {currentLang === "fr" ? "English version" : "Version française"}
    </div>
  );
};

export default Lang;
