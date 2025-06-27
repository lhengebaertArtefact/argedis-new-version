"use client";

import { ReactNode } from "react";

/* eslint-disable @next/next/no-img-element */

interface ConditionalLottieProps {
  imageError: boolean;
  defaultContent: ReactNode;
  errorContent: ReactNode;
}

const ConditionalLottie: React.FC<ConditionalLottieProps> = ({
  imageError,
  defaultContent,
  errorContent,
}) => {
  return imageError ? errorContent : defaultContent;
};

export default ConditionalLottie;
