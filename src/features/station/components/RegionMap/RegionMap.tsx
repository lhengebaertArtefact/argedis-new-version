"use client";

import { useState, useCallback } from "react";
import { Station } from "@/shared/types";
import { Producer } from "../../types";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "react-lottie";
import ConditionalLottie from "@/shared/components/ConditionalLottie/ConditionalLottie";
import MiniMapConditionalImage from "@/shared/components/MiniMapConditionalImage/MiniMapConditionalImage";
import ArrowBackToMapConditional from "@/shared/components/ArrowBackToMapConditional/ArrowBackToMapConditional";
import ProducerDetails from "../ProducerDetails/ProducerDetails";

interface RegionMapProps {
  station: Station;
  producers: Producer[];
  selectedProducer: Producer | null;
  onProducerSelect: (producer: Producer | null, index: number) => void;
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
  const [showProducerDetails, setShowProducerDetails] = useState(false);
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

  console.log("Station backgroundRadient:", station.backgroundRadient);
  console.log("Station data:", station);

  const backgroundStyle = station.backgroundRadient
    ? station.backgroundRadient.startsWith("http")
      ? { backgroundImage: `url(${station.backgroundRadient})` }
      : { background: station.backgroundRadient }
    : { backgroundColor: "#f0f9ff" };

  const handleProducerClick = (producer: Producer, index: number) => {
    onProducerSelect(producer, index);
    setShowProducerDetails(true);
  };

  const handleCloseProducerDetails = () => {
    setShowProducerDetails(false);
    onProducerSelect(null, -1);
  };

  const handleNextProducer = () => {
    if (selectedProducer) {
      const currentIndex = producers.findIndex(
        (p) => p.id === selectedProducer.id
      );
      const nextIndex = (currentIndex + 1) % producers.length;
      onProducerSelect(producers[nextIndex], nextIndex);
    }
  };

  const handlePreviousProducer = () => {
    if (selectedProducer) {
      const currentIndex = producers.findIndex(
        (p) => p.id === selectedProducer.id
      );
      const prevIndex =
        currentIndex === 0 ? producers.length - 1 : currentIndex - 1;
      onProducerSelect(producers[prevIndex], prevIndex);
    }
  };

  const getPreviousProducer = () => {
    if (!selectedProducer) return null;
    const currentIndex = producers.findIndex(
      (p) => p.id === selectedProducer.id
    );
    const prevIndex =
      currentIndex === 0 ? producers.length - 1 : currentIndex - 1;
    return producers[prevIndex];
  };

  const getNextProducer = () => {
    if (!selectedProducer) return null;
    const currentIndex = producers.findIndex(
      (p) => p.id === selectedProducer.id
    );
    const nextIndex = (currentIndex + 1) % producers.length;
    return producers[nextIndex];
  };

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
          <MiniMapConditionalImage
            imageError={miniMapError}
            src={selectedProducer.miniMap?.url || ""}
            alt="small map of a region"
            className="mt-[200px]"
            onError={handleMiniMapError}
          />
        </motion.div>
      )}

      {selectedProducer && (
        <div
          className="absolute top-[84px] left-[48px] flex z-[10] cursor-pointer"
          onClick={handleCloseProducerDetails}
        >
          <div className="rounded-full bg-white w-[82px] h-[82px] flex justify-center items-center mr-[25px] pr-2">
            <ArrowBackToMapConditional
              imageError={imageError}
              svgContent={
                <path
                  d="M0.9375 21.6879C0.9375 22.5066 1.24019 23.205 1.86886 23.8311L20.0304 42.2051C20.5194 42.7349 21.1713 42.9998 21.9164 42.9998C23.4299 42.9998 24.6174 41.7957 24.6174 40.2063C24.6174 39.4357 24.3147 38.7374 23.8024 38.2076L7.43375 21.6879L23.8024 5.16814C24.3147 4.61427 24.6174 3.91592 24.6174 3.14532C24.6174 1.58004 23.4299 0.375977 21.9164 0.375977C21.1713 0.375977 20.5194 0.64087 20.0304 1.17066L1.86886 19.5446C1.24019 20.1708 0.960784 20.8691 0.9375 21.6879Z"
                  fill={station.secondaryColor || "#000"}
                />
              }
              onError={handleImageError}
            />
          </div>
          <button className="text-white text-buttonReturnToMap font-nexaBold">
            {currentLang === "fr" ? "Retourner à la carte" : "Return to map"}
          </button>
        </div>
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
                  onClick={() => handleProducerClick(producer, index)}
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

      <AnimatePresence>
        {showProducerDetails && selectedProducer && (
          <ProducerDetails
            producer={selectedProducer}
            previousProducer={getPreviousProducer()}
            nextProducer={getNextProducer()}
            onNextProducer={handleNextProducer}
            onPreviousProducer={handlePreviousProducer}
            primaryColor={station.primaryColor || "#000"}
            secondaryColor={station.secondaryColor || "#000"}
            totalProducers={producers.length}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
