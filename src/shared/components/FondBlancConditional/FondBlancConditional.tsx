"use client";

interface FondBlancConditionalProps {
  condition: boolean;
  src: string;
  alt: string;
  onError: () => void;
  className?: string;
}

const FondBlancConditional: React.FC<FondBlancConditionalProps> = ({
  condition,
  src,
  alt,
  onError,
  className = "",
}) => {
  return condition ? (
    <div className="w-full h-full bg-white"></div>
  ) : (
    <img
      className={`absolute top-[84px] z-[-1] ${className}`}
      src={src}
      alt={alt}
      onError={onError}
    />
  );
};

export default FondBlancConditional;
