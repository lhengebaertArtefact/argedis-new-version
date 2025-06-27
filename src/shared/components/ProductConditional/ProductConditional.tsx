"use client";

interface ProductConditionalProps {
  condition: boolean;
  src: string;
  alt: string;
  onError: () => void;
  className?: string;
}

const ProductConditional: React.FC<ProductConditionalProps> = ({
  condition,
  src,
  alt,
  onError,
  className = "",
}) => {
  return condition ? (
    <div className="w-full h-full bg-white"></div>
  ) : (
    <img src={src} alt={alt} onError={onError} className={className} />
  );
};

export default ProductConditional;
