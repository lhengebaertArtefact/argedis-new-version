/* eslint-disable @next/next/no-img-element */
"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import Producer from "./Producer";
import { AnimatePresence, motion } from "framer-motion";
import Lottie from "react-lottie";
import PhotoProducer from "./PhotoProducer";
import { StationData, ProducerType } from "@/shared/types/types";
import { LANG_EN, LANG_FR } from "@/constants/constants";
import Lang from "./Lang";
import ConditionalLottie from "./ConditionalLottie";
import ArroBackToMapConditional from "./ArrowBackToMapConditional";
import MiniMapConditionalImage from "./MiniMapConditionalImage";
import PhotoProducerOnMapConditional from "./PhotoProducerOnMapConditional";
import gif_main from "../public/gif_main.gif";

const producerPhotoOnMap = "absolute w-[144px] top-[5px] z-[5]";

export default function RegionMap({ region }: { region: StationData }) {
  const [currentLang, setCurrentLang] = useState<string>(LANG_FR);
  const [openProducer, setOpenProducer] = useState<string | null>(null);
  const [toggle, setToggle] = useState(false);
  const [currentProducerIndex, setCurrentProducerIndex] = useState<number>(-1);
  const [imageError, setImageError] = useState<boolean>(false);
  const [showProducer, setShowProducer] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const currentRegion = useMemo(
    () => region[currentLang as keyof StationData],
    [currentLang, region]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === currentRegion.producersCollection.items.length - 1
          ? 0
          : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [currentRegion.producersCollection.items.length]);

  const myLottie: any | undefined = currentRegion?.lottieMap;
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: myLottie, // Chargement de l'animation depuis le fichier JSON
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  // Fonction pour basculer entre le français et l'anglais
  const toggleLanguage = () => {
    setCurrentLang((prevLang) => (prevLang === LANG_FR ? LANG_EN : LANG_FR));
  };

  // Fonction pour ouvrir ou fermer le composant Producer
  const openOrClose = (producerid: string | null, index: number) => {
    setOpenProducer(producerid);
    setCurrentProducerIndex(index);
    setToggle(!toggle);
    setShowProducer(false);
  };

  const nextProducer = useCallback(() => {
    setCurrentProducerIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex < currentRegion.producersCollection.items.length
        ? nextIndex
        : 0;
    });
    setShowProducer(true);
  }, [currentRegion]);

  const previousProducer = useCallback(() => {
    setCurrentProducerIndex((prevIndex) => {
      const nextIndex = prevIndex - 1;
      return nextIndex >= 0
        ? nextIndex
        : currentRegion.producersCollection.items.length - 1;
    });
    setShowProducer(true);
  }, [currentRegion]);

  return (
    <div
      className={" bg-cover bg-center max-w-full h-screen"}
      style={{
        backgroundImage: currentRegion?.backgroundRadient,
      }}
    >
      <motion.div
        className="absolute top-[0px]"
        initial={{ scale: 1, y: 0, opacity: 1 }}
        animate={{
          scale: toggle ? 0.63 : 1,
          y: toggle ? -595 : 0,
          x: toggle ? -15 : 0,
          opacity: toggle ? 0 : 1,
        }}
        transition={{
          duration: 0.3,
          opacity: toggle ? { delay: 0.3 } : 1,
        }}
      >
        <motion.div
          initial={{ opacity: 1 }}
          animate={{
            opacity: toggle ? 0 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          <ConditionalLottie
            imageError={imageError}
            defaultContent={<Lottie options={defaultOptions} />}
            errorContent={<div className="w-full h-full bg-white"></div>}
          />
        </motion.div>
      </motion.div>

      {toggle && (
        <motion.div
          className="absolute top-[5px] left-[-15px]"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <MiniMapConditionalImage
            imageError={imageError}
            src={
              currentRegion.producersCollection.items[currentProducerIndex]
                .miniMap.url
            }
            alt="small map of a region"
            className="mt-[200px]"
            onError={handleImageError}
          />
        </motion.div>
      )}

      <button
        className="absolute top-[84px] right-[48px] z-2 bg-white rounded-full px-6 py-5 text-buttonToggleLangage font-nexaBold z-[5]"
        onClick={toggleLanguage}
      >
        <Lang
          imageError={imageError}
          currentLang={currentLang}
          handleImageError={handleImageError}
        />
      </button>

      {currentRegion && (
        <div className="w-screen h-screen fixed">
          <ul>
            <li>
              {openProducer ? (
                <div>
                  <div
                    className="absolute top-[84px] left-[48px] flex z-[10]"
                    onClick={() => openOrClose(null, -1)}
                  >
                    <div className="rounded-full bg-blanc w-[82px] h-[82px] flex justify-center items-center mr-[25px] cursor-pointer pr-2">
                      <ArroBackToMapConditional
                        imageError={imageError}
                        svgContent={
                          <path
                            d="M0.9375 21.6879C0.9375 22.5066 1.24019 23.205 1.86886 23.8311L20.0304 42.2051C20.5194 42.7349 21.1713 42.9998 21.9164 42.9998C23.4299 42.9998 24.6174 41.7957 24.6174 40.2063C24.6174 39.4357 24.3147 38.7374 23.8024 38.2076L7.43375 21.6879L23.8024 5.16814C24.3147 4.61427 24.6174 3.91592 24.6174 3.14532C24.6174 1.58004 23.4299 0.375977 21.9164 0.375977C21.1713 0.375977 20.5194 0.64087 20.0304 1.17066L1.86886 19.5446C1.24019 20.1708 0.960784 20.8691 0.9375 21.6879Z"
                            fill={currentRegion.secondaryColor}
                          />
                        }
                        onError={handleImageError}
                      />
                    </div>
                    <button className="text-white text-buttonReturnToMap font-nexaBold">
                      {currentLang === LANG_FR
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
                      animate={{ y: 0, opacity: 1 }}
                      exit={
                        showProducer
                          ? { opacity: 0, transition: { duration: 0.5 } }
                          : { opacity: 0 }
                      }
                      transition={
                        showProducer
                          ? {
                              duration: 0.8,
                              ease: "easeIn",
                            }
                          : {
                              duration: 0.2,
                            }
                      }
                    >
                      <Producer
                        producer={
                          currentRegion.producersCollection.items[
                            currentProducerIndex
                          ]
                        }
                        previousProducer={
                          currentProducerIndex > 0
                            ? currentRegion.producersCollection.items[
                                currentProducerIndex - 1
                              ]
                            : currentRegion.producersCollection.items[
                                currentRegion.producersCollection.items.length -
                                  1
                              ]
                        }
                        nextProducer={
                          currentProducerIndex <
                          currentRegion.producersCollection.items.length - 1
                            ? currentRegion.producersCollection.items[
                                currentProducerIndex + 1
                              ]
                            : currentRegion.producersCollection.items[0]
                        }
                        onNextSupplier={nextProducer}
                        onPreviousSupplier={previousProducer}
                        onError={handleImageError}
                        imageError={imageError}
                        currentLang={currentLang}
                        primaryColor={currentRegion.primaryColor}
                        secondaryColor={currentRegion.secondaryColor}
                        length={currentRegion.producersCollection.items.length}
                      />
                      <div style={{ height: "100vh" }}></div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              ) : (
                <div key={currentProducerIndex}>
                  <div className="absolute top-[232px] pl-[150px] pr-[150px] left-0 right-0">
                    <h1 className="text-white text-center text-welcomeText mb-8  font-nexaBold">
                      {currentLang === LANG_FR
                        ? "Découvrez le savoir-faire de nos fournisseurs locaux !"
                        : "Discover the know-how of our local suppliers!"}
                    </h1>
                    <p className="text-white text-center text-welcomeText2 font-nexaRegular">
                      {currentLang === LANG_FR
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
                      {currentRegion.producersCollection.items
                        .filter((e) => e !== null)
                        .map((producer: ProducerType, index: number) => (
                          <button
                            key={index}
                            className="absolute w-[300px] h-[50px] border-none rounded-full"
                            style={{
                              top: producer.y,
                              left: producer.x,
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
                                        src={gif_main.src}
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
                                    producerPhoto={producer.picture.url}
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
                                  >
                                    {" "}
                                  </motion.div>
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
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
