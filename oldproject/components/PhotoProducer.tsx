"use client";
import { PhotoProducerProps } from "@/shared/types/types";

function PhotoProducer({
  producerPhoto,
  classProducer,
  colorBorder,
  onError,
}: PhotoProducerProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 309 292"
      fill="none"
      className={`${classProducer}`}
      onError={onError}
    >
      <image
        href={producerPhoto}
        width="309"
        height="292"
        x="0"
        y="0"
        preserveAspectRatio="xMidYMid slice"
      />
      <path
        d="M166.144 5C131.937 5 91.8969 18.6989 60.3786 41.3809C28.8996 64.0346 5 96.3665 5 134.037C5 171.082 23.7627 210.717 54.5837 240.272C85.4805 269.9 128.843 289.742 178.462 286.691C228.962 283.587 261.753 249.378 280.953 211.612C300.08 173.988 306.396 131.6 303.214 109.692C300.1 88.2514 290.738 62.0318 269.492 41.1361C248.147 20.1432 215.288 5 166.144 5Z"
        fill="none"
        stroke={colorBorder}
        strokeWidth="15"
      />
    </svg>
  );
}

export default PhotoProducer;
