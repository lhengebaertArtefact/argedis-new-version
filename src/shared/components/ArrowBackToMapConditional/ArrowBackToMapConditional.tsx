"use client";

interface ArrowBackToMapConditionalProps {
  imageError: boolean;
  svgContent: React.ReactNode;
  onError: () => void;
}

const ArrowBackToMapConditional: React.FC<ArrowBackToMapConditionalProps> = ({
  imageError,
  svgContent,
  onError,
}) => {
  return imageError ? (
    <div className="w-full h-full bg-white"></div>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="43"
      viewBox="0 0 25 43"
      fill="none"
      onError={onError}
    >
      {svgContent}
    </svg>
  );
};

export default ArrowBackToMapConditional;
