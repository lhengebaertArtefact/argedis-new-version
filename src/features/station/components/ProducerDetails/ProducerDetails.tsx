"use client";

import { Producer } from "../../types";
import { useTranslation } from "react-i18next";

interface ProducerDetailsProps {
  producer: Producer;
  producers: Producer[];
  onProducerChange: (producer: Producer) => void;
}

export default function ProducerDetails({
  producer,
  producers,
  onProducerChange,
}: ProducerDetailsProps) {
  const { t } = useTranslation();
  const currentIndex = producers.findIndex((prod) => prod.id === producer.id);

  const nextProducer = () => {
    const nextIndex = (currentIndex + 1) % producers.length;
    onProducerChange(producers[nextIndex]);
  };

  const prevProducer = () => {
    const prevIndex =
      currentIndex === 0 ? producers.length - 1 : currentIndex - 1;
    onProducerChange(producers[prevIndex]);
  };

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-2xl font-bold text-gray-600">
            {producer.name
              .split(" ")
              .map((word) => word[0])
              .join("")
              .slice(0, 2)}
          </span>
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {producer.name}
          </h2>
        </div>
      </div>

      <div className="flex-1 mb-6">
        <p className="text-gray-700 leading-relaxed">{producer.description}</p>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={prevProducer}
          className="px-4 py-2 bg-gray-100  flex items-center gap-2 transition-colors text-gray-800"
          title="Producteur précédent"
        >
          {t("navigation.previous")}
        </button>

        <button
          onClick={nextProducer}
          className="px-4 py-2 bg-gray-100  flex items-center gap-2 transition-colors text-gray-800"
          title="Producteur suivant"
        >
          {t("navigation.next")}
        </button>
      </div>
    </div>
  );
}
