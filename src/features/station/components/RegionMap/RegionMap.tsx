"use client";

import { useState, useCallback, useEffect } from "react";
import { Station } from "@/shared/types";
import { Producer } from "../../types";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "react-lottie";
import ConditionalLottie from "@/shared/components/ConditionalLottie/ConditionalLottie";
import MiniMapConditionalImage from "@/shared/components/MiniMapConditionalImage/MiniMapConditionalImage";
import ArrowBackToMapConditional from "@/shared/components/ArrowBackToMapConditional/ArrowBackToMapConditional";
import PhotoProducerOnMapConditional from "@/shared/components/PhotoProducerOnMapConditional/PhotoProducerOnMapConditional";
import PhotoProducer from "@/shared/components/PhotoProducer/PhotoProducer";
import ProducerDetails from "../ProducerDetails/ProducerDetails";
import {
  getMiniMapPosition,
  getRegionScale,
} from "../../config/mapPositioning.config";

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
  const [openProducer, setOpenProducer] = useState<string | null>(null);
  const [toggle, setToggle] = useState(false);
  const [currentProducerIndex, setCurrentProducerIndex] = useState<number>(-1);
  const [showProducer, setShowProducer] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isClosing, setIsClosing] = useState(false);
  const currentLang = i18n.language;

  const miniMapPosition = getMiniMapPosition(station.id);
  const regionScale = getRegionScale(station.id);

  const producerPhotoOnMap = "absolute w-[144px] top-[5px] z-[5]";

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === producers.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [producers.length]);

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

  const openOrClose = (producerId: string | null, index: number) => {
    if (producerId && index >= 0) {
      setOpenProducer(producerId);
      setCurrentProducerIndex(index);
      setToggle(true);
      setShowProducer(false);
      setIsClosing(false);
      onProducerSelect(producers[index], index);
    } else {
      setIsClosing(true);
      setToggle(false);
      onProducerSelect(null, -1);
    }
  };

  const nextProducer = useCallback(() => {
    setCurrentProducerIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      const newIndex = nextIndex < producers.length ? nextIndex : 0;
      onProducerSelect(producers[newIndex], newIndex);
      return newIndex;
    });
    setShowProducer(true);
  }, [producers, onProducerSelect]);

  const previousProducer = useCallback(() => {
    setCurrentProducerIndex((prevIndex) => {
      const newIndex = prevIndex - 1;
      const finalIndex = newIndex >= 0 ? newIndex : producers.length - 1;
      onProducerSelect(producers[finalIndex], finalIndex);
      return finalIndex;
    });
    setShowProducer(true);
  }, [producers, onProducerSelect]);

  const handleAnimationComplete = () => {
    if (isClosing) {
      setOpenProducer(null);
      setIsClosing(false);
    }
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
          scale: toggle ? regionScale : 1,
          y: toggle ? -595 : 0,
          x: toggle ? -15 : 0,
          opacity: toggle ? 1 : 1,
          filter: toggle
            ? "blur(0.3px) brightness(1.015) contrast(1.02)"
            : "blur(0px) brightness(1) contrast(1)",
        }}
        transition={{
          duration: toggle ? 0.6 : 1.2,
          ease: toggle ? [0.25, 0.46, 0.45, 0.94] : "easeInOut",
          filter: toggle
            ? { delay: 0.15, duration: 0.025 }
            : { duration: 0.08 },
        }}
      >
        <AnimatePresence>
          <motion.div
            key="large-map"
            initial={{ opacity: 1 }}
            animate={{
              opacity: toggle ? 0.7 : 1,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: toggle ? 0.15 : 0.08,
              delay: toggle ? 0.25 : 0.18,
              ease: "easeInOut",
            }}
            className="w-full h-full"
          >
            <ConditionalLottie
              imageError={imageError}
              defaultContent={<Lottie options={lottieOptions} />}
              errorContent={<div className="w-full h-full bg-white"></div>}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {toggle && (
        <AnimatePresence>
          <motion.div
            key="small-map"
            className="absolute"
            style={{
              top: miniMapPosition.top,
              left: miniMapPosition.left,
            }}
            initial={{
              opacity: 0,
              scale: 1.02,
              filter: "blur(0.3px) brightness(1.015) contrast(1.02)",
              y: 1,
              rotateX: 0.5,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: "blur(0px) brightness(1) contrast(1)",
              y: 0,
              rotateX: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.15,
              delay: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <MiniMapConditionalImage
              imageError={miniMapError}
              src={producers[currentProducerIndex]?.miniMap?.url || ""}
              alt="small map of a region"
              className="mt-[200px]"
              onError={handleMiniMapError}
            />
          </motion.div>
        </AnimatePresence>
      )}

      <div className="w-screen h-screen fixed">
        {openProducer ? (
          <div>
            <div
              className="absolute top-[84px] left-[48px] flex z-[10] cursor-pointer"
              onClick={() => openOrClose(null, -1)}
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
                {currentLang === "fr"
                  ? "Retourner à la carte"
                  : "Return to map"}
              </button>
            </div>

            <AnimatePresence>
              <motion.div
                initial={
                  showProducer
                    ? { y: 0, opacity: 1 }
                    : { y: "100vh", opacity: 0 }
                }
                animate={
                  isClosing ? { y: "100vh", opacity: 0 } : { y: 0, opacity: 1 }
                }
                onAnimationComplete={handleAnimationComplete}
                transition={{
                  duration: isClosing ? 1.2 : showProducer ? 0.8 : 0.6,
                  ease: isClosing
                    ? "easeInOut"
                    : showProducer
                    ? "easeIn"
                    : "easeOut",
                }}
              >
                <ProducerDetails
                  producer={producers[currentProducerIndex]}
                  previousProducer={
                    currentProducerIndex > 0
                      ? producers[currentProducerIndex - 1]
                      : producers[producers.length - 1]
                  }
                  nextProducer={
                    currentProducerIndex < producers.length - 1
                      ? producers[currentProducerIndex + 1]
                      : producers[0]
                  }
                  onNextProducer={nextProducer}
                  onPreviousProducer={previousProducer}
                  primaryColor={station.primaryColor || "#000"}
                  secondaryColor={station.secondaryColor || "#000"}
                  totalProducers={producers.length}
                />
                <div style={{ height: "100vh" }}></div>
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          <div key={currentProducerIndex}>
            <div className="absolute top-[232px] pl-[150px] pr-[150px] left-0 right-0">
              <h1 className="text-white text-center text-welcomeText mb-8 font-nexaBold">
                {currentLang === "fr"
                  ? "Découvrez le savoir-faire de nos fournisseurs locaux !"
                  : "Discover the know-how of our local suppliers!"}
              </h1>
              <p className="text-white text-center text-welcomeText2 font-nexaRegular">
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
                {producers
                  .filter((producer) => producer !== null)
                  .map((producer, index) => (
                    <button
                      key={index}
                      className="absolute w-[300px] h-[50px] border-none rounded-full"
                      style={{
                        top: producer.blobPosition.y,
                        left: producer.blobPosition.x,
                      }}
                      onClick={() => openOrClose(producer.id, index)}
                    >
                      <PhotoProducerOnMapConditional
                        condition={!imageError}
                        trueContent={
                          <div className="relative">
                            <AnimatePresence>
                              {index === currentImageIndex && (
                                <motion.img
                                  src="/gif_main.gif"
                                  alt="main"
                                  style={{
                                    position: "absolute",
                                    top: "60px",
                                    left: "60px",
                                    transform: "rotate(-23deg)",
                                    zIndex: "10",
                                  }}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{
                                    opacity: 0,
                                    transition: { duration: 0.5 },
                                  }}
                                  transition={{ duration: 0, delay: 1 }}
                                />
                              )}
                            </AnimatePresence>
                            <PhotoProducer
                              producerPhoto={producer.picture?.url || ""}
                              classProducer={producerPhotoOnMap}
                            />

                            <motion.div
                              className="absolute top-[-4px] left-[-8px] w-[160px] h-[155px] bg-white opacity-50"
                              style={{
                                borderRadius:
                                  "55% 45% 45% 55% / 46% 42% 58% 54%",
                              }}
                              initial={{ scale: 1 }}
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{
                                duration: 1.2,
                                repeat: Infinity,
                                times: [0, 0.3, 1],
                              }}
                            />
                          </div>
                        }
                        falseContent={
                          <div className="w-full h-full bg-white"></div>
                        }
                      />
                    </button>
                  ))}
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
