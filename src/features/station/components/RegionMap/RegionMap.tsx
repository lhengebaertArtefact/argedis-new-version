"use client";

import { useState, useCallback } from "react";
import { Station } from "@/shared/types";
import { Producer } from "../../types";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "react-lottie";
import ConditionalLottie from "@/shared/components/ConditionalLottie/ConditionalLottie";
import MiniMapConditionalImage from "@/shared/components/MiniMapConditionalImage/MiniMapConditionalImage";

interface RegionMapProps {
  station: Station;
  producers: Producer[];
  selectedProducer: Producer | null;
  onProducerSelect: (producer: Producer, index: number) => void;
}

export default function RegionMap({
  station,
  producers,
  selectedProducer,
  onProducerSelect,
}: RegionMapProps) {
  const { t, i18n } = useTranslation();
  const [imageError, setImageError] = useState(false);
  const [miniMapError, setMiniMapError] = useState(false);
  const currentLang = i18n.language;

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  const handleMiniMapError = useCallback(() => {
    setMiniMapError(true);
  }, []);

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: station.lottieMap,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const backgroundStyle = station.backgroundRadient
    ? station.backgroundRadient.startsWith("http")
      ? { backgroundImage: `url(${station.backgroundRadient})` }
      : { background: station.backgroundRadient }
    : { backgroundColor: "#f0f9ff" };

  return (
    <div
      className="bg-cover bg-center max-w-full h-screen relative"
      style={backgroundStyle}
    >
      <motion.div
        className="absolute top-[0px] w-full h-full"
        initial={{ scale: 1, y: 0, opacity: 1 }}
        animate={{
          scale: selectedProducer ? 0.63 : 1,
          y: selectedProducer ? -595 : 0,
          x: selectedProducer ? -15 : 0,
          opacity: selectedProducer ? 0 : 1,
        }}
        transition={{
          duration: 0.3,
          opacity: selectedProducer
            ? { delay: 0.3, duration: 0.2 }
            : { duration: 0.2 },
        }}
      >
        <motion.div
          initial={{ opacity: 1 }}
          animate={{
            opacity: selectedProducer ? 0 : 1,
          }}
          transition={{ duration: 0.2 }}
          className="w-full h-full"
        >
          <ConditionalLottie
            imageError={imageError}
            defaultContent={<Lottie options={lottieOptions} />}
            errorContent={<div className="w-full h-full bg-white"></div>}
          />
        </motion.div>
      </motion.div>

      {selectedProducer && (
        <motion.div
          className="absolute top-[5px] left-[-15px]"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="mt-[200px]">
            <MiniMapConditionalImage
              imageError={miniMapError}
              src={station.miniMap || ""}
              alt="Mini carte de la région"
              className="w-64 h-48 rounded-lg"
              onError={handleMiniMapError}
            />
          </div>
        </motion.div>
      )}

      {!selectedProducer && (
        <div className="absolute inset-0">
          <div className="absolute top-[232px] pl-[150px] pr-[150px] left-0 right-0">
            <h1 className="text-white text-center text-2xl mb-8 font-bold drop-shadow-lg">
              {currentLang === "fr"
                ? "Découvrez le savoir-faire de nos fournisseurs locaux !"
                : "Discover the know-how of our local suppliers!"}
            </h1>
            <p className="text-white text-center text-lg drop-shadow-lg">
              {currentLang === "fr"
                ? "Cliquez sur le fournisseur de votre choix"
                : "Click on the local producer you want"}
            </p>
          </div>

          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: -595 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {producers.map((producer, index) => (
                <button
                  key={producer.id}
                  className="absolute w-[300px] h-[50px] border-none rounded-full"
                  style={{
                    top: producer.blobPosition.y,
                    left: producer.blobPosition.x,
                  }}
                  onClick={() => onProducerSelect(producer, index)}
                >
                  <div className="relative">
                    <div className="w-16 h-16 bg-white rounded-full border-2 border-gray-300 flex items-center justify-center text-xs font-semibold shadow-lg hover:scale-110 transition-transform">
                      {producer.name
                        .split(" ")
                        .map((word) => word[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                  </div>
                </button>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
