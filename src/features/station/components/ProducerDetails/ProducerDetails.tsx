"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Producer } from "../../types";
import { useTranslation } from "react-i18next";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import PhotoProducerConditional from "@/shared/components/PhotoProducerConditional/PhotoProducerConditional";
import ProductConditional from "@/shared/components/ProductConditional/ProductConditional";
import FondBlancConditional from "@/shared/components/FondBlancConditional/FondBlancConditional";
import Button from "@/shared/components/Button/Button";

interface ProducerDetailsProps {
  producer: Producer;
  onNextProducer: () => void;
  onPreviousProducer: () => void;
  nextProducer: Producer | null;
  previousProducer: Producer | null;
  totalProducers: number;
  primaryColor: string;
  secondaryColor: string;
}

export default function ProducerDetails({
  producer,
  onNextProducer,
  onPreviousProducer,
  nextProducer,
  previousProducer,
  totalProducers,
  primaryColor,
  secondaryColor,
}: ProducerDetailsProps) {
  const { t, i18n } = useTranslation();
  const [imageError, setImageError] = useState(false);
  const [h, setH] = useState(0);
  const hRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hRef.current) {
      setH(hRef.current.clientHeight + 204);
    }
  }, [hRef, producer]);

  const [animationNextSettings, setAnimationNextSettings] = useState({
    initial: { opacity: 0 },
    animate: { opacity: 0, transition: { duration: 0 } },
  });
  const [animationPreviousSettings, setAnimationPreviousSettings] = useState({
    initial: { opacity: 0 },
    animate: { opacity: 0, transition: { duration: 0 } },
  });

  const handleNextSupplier = () => {
    onNextProducer();

    setAnimationPreviousSettings({
      initial: { opacity: 1 },
      animate: { opacity: 0, transition: { duration: 0.3 } },
    });
  };

  const handlePreviousSupplier = () => {
    onPreviousProducer();

    setAnimationNextSettings({
      initial: { opacity: 1 },
      animate: { opacity: 0, transition: { duration: 0.3 } },
    });
  };

  const onError = () => {
    setImageError(true);
  };

  const producerMainPhoto = "fixed top-[655px] left-[68px] w-[289px]";
  const producerPhotoButtonLeft = "w-[51px] ml-[24px]";
  const producerPhotoButtonRight = "w-[51px] mr-[24px]";

  // Fonction pour rendre le contenu complet d'un producteur
  const renderProducerContent = (prod: Producer, isMain: boolean = false) => (
    <>
      <PhotoProducerConditional
        errorImage={imageError}
        producerPhoto={prod.picture?.url || ""}
        classProducer={producerMainPhoto}
        onError={onError}
      />

      <ul className="fixed top-[700px] left-[400px] flex">
        {prod.products?.map((product, index) => (
          <li key={index}>
            <FondBlancConditional
              condition={imageError}
              src="/fond.png"
              alt="bubble white for products"
              onError={onError}
            />
            <ProductConditional
              condition={imageError}
              src={product.picture?.url || ""}
              alt={product.name}
              onError={onError}
            />
          </li>
        ))}
      </ul>

      <div
        className="fixed top-[956px] left-[116px] right-[116px] max-h-[674px]"
        ref={isMain ? hRef : null}
      >
        <p
          className="text-[40px] leading-[48px] mb-[48px] font-nexaBold"
          style={{ color: primaryColor }}
        >
          {prod.name}
        </p>
        <div
          className={`text-[28px] leading-[42px] font-nexaRegular ${
            prod.hasSpace ? "paragraphe" : ""
          }`}
          style={{ color: "var(--texte-fiche-fournisseur)" }}
        >
          {prod.description && (
            <>
              {typeof prod.description === "string" ? (
                (() => {
                  try {
                    const parsed = JSON.parse(prod.description);
                    return documentToReactComponents(parsed, {
                      preserveWhitespace: true,
                    });
                  } catch {
                    return (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: prod.description,
                        }}
                      />
                    );
                  }
                })()
              ) : prod.description?.json ? (
                documentToReactComponents(prod.description.json, {
                  preserveWhitespace: true,
                })
              ) : (
                <div>Description format not supported</div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );

  return (
    <div
      className="absolute z-1 rounded-[40px] bg-white top-[830px] left-[48px] right-[48px] px-[68px] pt-[126px] py-[68px] overflow-hidden"
      style={{ height: h > 0 ? h : "auto", transition: "height 0.4s" }}
      key={producer.id}
    >
      <AnimatePresence>
        {/* Contenu principal du producteur actuel */}
        <div key={producer.id + "main"}>
          {renderProducerContent(producer, true)}
        </div>

        {/* Contenu du producteur suivant (pour transition) */}
        {nextProducer && (
          <motion.div key={producer.id + "next"} {...animationNextSettings}>
            {renderProducerContent(nextProducer)}
          </motion.div>
        )}

        {/* Contenu du producteur précédent (pour transition) */}
        {previousProducer && (
          <motion.div
            key={producer.id + "previous"}
            {...animationPreviousSettings}
          >
            {renderProducerContent(previousProducer)}
          </motion.div>
        )}
      </AnimatePresence>

      {totalProducers > 1 && (
        <div className="fixed bottom-0 left-[48px] right-[48px] flex mb-[70px] justify-between items-center text-white">
          <Button
            cb={handlePreviousSupplier}
            imageError={imageError}
            txt={
              <span className="mt-[5px]">
                {i18n.language === "fr"
                  ? "Fournisseur précédent"
                  : "Previous producer"}
              </span>
            }
            img={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="30"
                viewBox="0 0 21 30"
                fill="none"
                className="mr-[43px]"
              >
                <path
                  d="M-3.27628e-06 15C-3.40214e-06 14.4237 0.268433 13.9322 0.825955 13.4915L16.9321 0.559317C17.3658 0.186436 17.9439 -3.13742e-06 18.6047 -3.25295e-06C19.9469 -3.48763e-06 21 0.847452 21 1.9661C21 2.50847 20.7316 3 20.2773 3.37288L5.76106 15L20.2773 26.6271C20.7316 27.0169 21 27.5085 21 28.0508C21 29.1525 19.9469 30 18.6047 30C17.944 30 17.3658 29.8136 16.9322 29.4407L0.825956 16.5085C0.268434 16.0678 0.0206458 15.5763 -3.27628e-06 15Z"
                  fill={secondaryColor}
                />
              </svg>
            }
            imgPosition="left"
          >
            {previousProducer ? (
              <PhotoProducerConditional
                errorImage={imageError}
                producerPhoto={previousProducer.picture?.url || ""}
                classProducer={producerPhotoButtonLeft}
                colorBorder={secondaryColor}
                onError={onError}
              />
            ) : (
              <div />
            )}
          </Button>

          <Button
            cb={handleNextSupplier}
            imageError={imageError}
            txt={
              <span className="mt-[5px]">
                {i18n.language === "fr"
                  ? "Fournisseur suivant"
                  : "Next producer"}
              </span>
            }
            img={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="30"
                viewBox="0 0 21 30"
                fill="none"
                className="ml-[43px]"
              >
                <path
                  d="M21 15C21 15.5763 20.7316 16.0678 20.174 16.5085L4.06784 29.4407C3.63422 29.8136 3.05604 30 2.39528 30C1.05309 30 -3.18569e-06 29.1525 -3.13663e-06 28.0339C-3.11285e-06 27.4915 0.268433 27 0.72271 26.6271L15.2389 15L0.722711 3.37288C0.268434 2.98305 -2.0166e-06 2.49152 -1.99282e-06 1.94915C-1.94451e-06 0.847456 1.05309 -1.74381e-06 2.39528 -1.62648e-06C3.05605 -1.56871e-06 3.63422 0.186439 4.06784 0.559321L20.174 13.4915C20.7316 13.9322 20.9794 14.4237 21 15Z"
                  fill={secondaryColor}
                />
              </svg>
            }
            imgPosition="right"
          >
            {nextProducer ? (
              <PhotoProducerConditional
                errorImage={imageError}
                producerPhoto={nextProducer.picture?.url || ""}
                classProducer={producerPhotoButtonRight}
                colorBorder={secondaryColor}
                onError={onError}
              />
            ) : (
              <div />
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
