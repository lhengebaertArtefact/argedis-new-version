"use client";
/* eslint-disable @next/next/no-img-element */

interface FondBlancConditionalProps {
  condition: boolean;
  src: string;
  alt: string;
  onError: () => void;
}

const FondBlancConditional: React.FC<FondBlancConditionalProps> = ({
  condition,
  src,
  alt,
  onError,
}) => {
  return condition ? (
    <div className="w-full h-full bg-white"></div>
  ) : (
    <img
      className="absolute top-[84px] z-[-1]"
      src={src}
      alt={alt}
      onError={onError}
    />
  );
};

export default FondBlancConditional;
