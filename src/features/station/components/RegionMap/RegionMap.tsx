"use client";

import { Station } from "@/shared/types";
import { Producer } from "../../types";
import { MAP_DIMENSIONS } from "@/shared/constants/dimensions";
import { useTranslation } from "react-i18next";

interface RegionMapProps {
  station: Station;
  producers: Producer[];
  selectedProducer: Producer | null;
  onProducerSelect: (producer: Producer) => void;
}

export default function RegionMap({
  station,
  producers,
  selectedProducer,
  onProducerSelect,
}: RegionMapProps) {
  const { t } = useTranslation();

  return (
    <div className="relative">
      <div
        className="bg-green-100 rounded-lg border border-green-200 flex items-center justify-center"
        style={{
          width: `${MAP_DIMENSIONS.WIDTH}px`,
          height: `${MAP_DIMENSIONS.HEIGHT}px`,
        }}
      >
        <div className="text-center">
          <h3 className="text-2xl font-bold text-green-800 mb-2">
            {t("map.regionMap", { region: station.region })}
          </h3>
          <p className="text-green-600">{t("map.regionImageComing")}</p>
        </div>
      </div>

      {producers.map((producer) => (
        <div key={producer.id}>
          <button
            className={`absolute w-16 h-16 rounded-full border-2 flex items-center justify-center text-xs font-semibold ${
              selectedProducer?.id === producer.id
                ? "bg-blue-500 text-white border-blue-600 scale-110"
                : "bg-white text-gray-700 border-gray-300 "
            }`}
            style={{
              left: `${producer.blobPosition.x - 32}px`,
              top: `${producer.blobPosition.y - 32}px`,
            }}
            onClick={() => onProducerSelect(producer)}
          >
            {producer.name
              .split(" ")
              .map((word) => word[0])
              .join("")
              .slice(0, 2)}
          </button>
        </div>
      ))}
    </div>
  );
}
