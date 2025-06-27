"use client";

import PhotoProducer from "../PhotoProducer/PhotoProducer";

interface PhotoProducerConditionalProps {
  errorImage: boolean;
  producerPhoto: string;
  classProducer: string;
  colorBorder?: string;
  onError?: () => void;
}

const PhotoProducerConditional: React.FC<PhotoProducerConditionalProps> = ({
  errorImage,
  producerPhoto,
  classProducer,
  colorBorder,
  onError,
}) => {
  return errorImage ? (
    <div className="w-full h-full bg-white"></div>
  ) : (
    <PhotoProducer
      producerPhoto={producerPhoto}
      classProducer={classProducer}
      colorBorder={colorBorder}
      onError={onError}
    />
  );
};

export default PhotoProducerConditional;
