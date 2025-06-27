"use client";
/* eslint-disable @next/next/no-img-element */

interface MiniMapConditionalImageProps {
  imageError: boolean;
  src: string;
  alt: string;
  className?: string;
  onError: () => void;
}

const MiniMapConditionalImage: React.FC<MiniMapConditionalImageProps> = ({
  imageError,
  src,
  alt,
  className,
  onError,
}) => {
  return imageError ? (
    <div className="w-full h-full bg-white"></div>
  ) : (
    <div>
      <img src={src} alt={alt} className={className} onError={onError} />
    </div>
  );
};
export default MiniMapConditionalImage;
