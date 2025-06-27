"use client";
/* eslint-disable @next/next/no-img-element */

interface ProductConditionalProps {
  condition: boolean;
  src: string;
  alt: string;
  onError: () => void;
}

const ProductConditional: React.FC<ProductConditionalProps> = ({
  condition,
  src,
  alt,
  onError,
}) => {
  return condition ? (
    <div className="w-full h-full bg-white"></div>
  ) : (
    <img src={src} alt={alt} onError={onError} />
  );
};

export default ProductConditional;
