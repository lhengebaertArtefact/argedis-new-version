"use client";

import React from "react";

interface ButtonProps {
  cb: () => void;
  imageError: boolean;
  children: React.ReactElement;
  txt: React.ReactElement;
  img: React.ReactElement;
  imgPosition: "left" | "right";
}

const Button: React.FC<ButtonProps> = ({
  cb,
  imageError,
  children,
  txt,
  img,
  imgPosition,
}) => {
  return (
    <button
      className="flex justify-between items-center rounded-[40px] bg-white h-[116px] text-buttonProducerText px-[32px] text-black font-nexaBold"
      onClick={cb}
    >
      {imgPosition === "left" && img}
      {imgPosition === "left" && txt}

      {imageError ? <div className="w-full h-full bg-white"></div> : children}

      {imgPosition === "right" && txt}
      {imgPosition === "right" && img}
    </button>
  );
};

export default Button;
