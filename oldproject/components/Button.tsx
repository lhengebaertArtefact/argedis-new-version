"use client";
/* eslint-disable @next/next/no-img-element */

const Button = ({
  cb,
  imageError,
  children,
  txt,
  img,
  imgPosition,
}: {
  cb: () => void;
  imageError: boolean;
  children: JSX.Element;
  txt: JSX.Element;
  img: JSX.Element;
  imgPosition: "left" | "right";
}) => {
  return (
    <button
      className="flex justify-between items-center rounded-[40px] bg-blanc h-[116px] text-buttonProducerText px-[32px] text-black font-nexaBold"
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
