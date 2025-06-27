"use client";
/* eslint-disable @next/next/no-img-element */

import PhotoProducer from "./PhotoProducer";

interface PhotoProducerConditionalProps {
  errorImage: boolean;
  producerPhoto: string;
  classProducer: string;
}

const PhotoProducerConditional: React.FC<PhotoProducerConditionalProps> = ({
  errorImage,
  producerPhoto,
  classProducer,
}) => {
  return errorImage ? (
    <div className="w-full h-full bg-white"></div>
  ) : (
    <PhotoProducer
      producerPhoto={producerPhoto}
      classProducer={classProducer}
    />
  );
};

export default PhotoProducerConditional;
