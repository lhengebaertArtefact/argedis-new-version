"use client";
/* eslint-disable @next/next/no-img-element */

interface PhotoProducerOnMapConditionalProps {
  condition: boolean;
  trueContent: React.ReactNode;
  falseContent: React.ReactNode;
}

const PhotoProducerOnMapConditional: React.FC<
  PhotoProducerOnMapConditionalProps
> = ({ condition, trueContent, falseContent }) => {
  return condition ? trueContent : falseContent;
};

export default PhotoProducerOnMapConditional;
