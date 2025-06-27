"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Producer } from "../../types";
import { useTranslation } from "react-i18next";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import PhotoProducerConditional from "@/shared/components/PhotoProducerConditional/PhotoProducerConditional";
import ProductConditional from "@/shared/components/ProductConditional/ProductConditional";
import FondBlancConditional from "@/shared/components/FondBlancConditional/FondBlancConditional";

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

  console.log("Producer products:", producer.products);

  return (
    <div
      className="absolute z-1 rounded-[40px] bg-white top-[830px] left-[48px] right-[48px] px-[68px] pt-[126px] py-[68px] overflow-hidden"
      style={{ height: h > 0 ? h : "auto", transition: "height 0.4s" }}
      key={producer.id}
    >
      <AnimatePresence>
        <PhotoProducerConditional
          errorImage={imageError}
          producerPhoto={producer.picture?.url || ""}
          classProducer={producerMainPhoto}
          onError={onError}
        />
        {nextProducer && (
          <motion.div key={producer.id + "0"} {...animationNextSettings}>
            <PhotoProducerConditional
              errorImage={imageError}
              producerPhoto={nextProducer.picture?.url || ""}
              classProducer={producerMainPhoto}
              onError={onError}
            />
          </motion.div>
        )}
        {previousProducer && (
          <motion.div key={producer.id + "1"} {...animationPreviousSettings}>
            <PhotoProducerConditional
              errorImage={imageError}
              producerPhoto={previousProducer.picture?.url || ""}
              classProducer={producerMainPhoto}
              onError={onError}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <ul className="fixed top-[700px] left-[400px] flex">
        {producer.products?.map((product, index) => (
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

      <div className="max-h-[674px]" ref={hRef}>
        <p className="text-2xl mb-12 font-bold" style={{ color: primaryColor }}>
          {producer.name}
        </p>
        <AnimatePresence>
          <motion.div
            className="text-lg leading-relaxed"
            initial={{ height: "auto", opacity: 1 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ opacity: 0.5 }}
            transition={{ duration: 0.1, delay: 0.4 }}
          >
            {producer.description && (
              <div
                dangerouslySetInnerHTML={{
                  __html: producer.description,
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {totalProducers > 1 && (
        <div className="fixed bottom-0 left-[48px] right-[48px] flex mb-[70px] justify-between items-center text-white">
          <button
            onClick={handlePreviousSupplier}
            className="flex items-center"
            disabled={!previousProducer}
          >
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
            <span className="mt-[5px]">
              {i18n.language === "fr"
                ? "Fournisseur précédent"
                : "Previous producer"}
            </span>
            {previousProducer && (
              <PhotoProducerConditional
                errorImage={imageError}
                producerPhoto={previousProducer.picture?.url || ""}
                classProducer={producerPhotoButtonLeft}
                colorBorder={secondaryColor}
                onError={onError}
              />
            )}
          </button>

          <button
            onClick={handleNextSupplier}
            className="flex items-center"
            disabled={!nextProducer}
          >
            {nextProducer && (
              <PhotoProducerConditional
                errorImage={imageError}
                producerPhoto={nextProducer.picture?.url || ""}
                classProducer={producerPhotoButtonRight}
                colorBorder={secondaryColor}
                onError={onError}
              />
            )}
            <span className="mt-[5px] ml-[43px]">
              {i18n.language === "fr" ? "Fournisseur suivant" : "Next producer"}
            </span>
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
          </button>
        </div>
      )}
    </div>
  );
}
