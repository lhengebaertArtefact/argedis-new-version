"use client";

import { useState, useCallback } from "react";
import { Station } from "@/shared/types";
import { Producer } from "../../types";
import { useTranslation } from "react-i18next";
import LanguageToggle from "@/shared/components/LanguageToggle/LanguageToggle";
import RegionMap from "../RegionMap/RegionMap";
import ProducerDetails from "../ProducerDetails/ProducerDetails";
import ProductPanel from "../ProductPanel/ProductPanel";

interface StationLayoutProps {
  station: Station;
  producers: Producer[];
}

export default function StationLayout({
  station,
  producers,
}: StationLayoutProps) {
  const { i18n } = useTranslation();
  const [selectedProducer, setSelectedProducer] = useState<Producer | null>(
    null
  );
  const [currentProducerIndex, setCurrentProducerIndex] = useState<number>(-1);

  const currentLang = i18n.language;

  const handleProducerSelect = (producer: Producer, index: number) => {
    setSelectedProducer(producer);
    setCurrentProducerIndex(index);
  };

  const handleProducerChange = (producer: Producer) => {
    setSelectedProducer(producer);
  };

  const handleBackToMap = () => {
    setSelectedProducer(null);
    setCurrentProducerIndex(-1);
  };

  return (
    <div className="relative overflow-hidden h-screen">
      <LanguageToggle />

      {/* Carte principale */}
      <RegionMap
        station={station}
        producers={producers}
        selectedProducer={selectedProducer}
        onProducerSelect={handleProducerSelect}
      />

      {/* Bouton retour à la carte */}
      {selectedProducer && (
        <div
          className="absolute top-[84px] left-[48px] flex z-[10] cursor-pointer"
          onClick={handleBackToMap}
        >
          <div className="rounded-full bg-white w-[82px] h-[82px] flex justify-center items-center mr-[25px] shadow-lg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M0.9375 21.6879C0.9375 22.5066 1.24019 23.205 1.86886 23.8311L20.0304 42.2051C20.5194 42.7349 21.1713 42.9998 21.9164 42.9998C23.4299 42.9998 24.6174 41.7957 24.6174 40.2063C24.6174 39.4357 24.3147 38.7374 23.8024 38.2076L7.43375 21.6879L23.8024 5.16814C24.3147 4.61427 24.6174 3.91592 24.6174 3.14532C24.6174 1.58004 23.4299 0.375977 21.9164 0.375977C21.1713 0.375977 20.5194 0.64087 20.0304 1.17066L1.86886 19.5446C1.24019 20.1708 0.960784 20.8691 0.9375 21.6879Z"
                fill="#666"
              />
            </svg>
          </div>
          <button className="text-white text-lg font-bold drop-shadow-lg">
            {currentLang === "fr" ? "Retourner à la carte" : "Return to map"}
          </button>
        </div>
      )}

      {selectedProducer && (
        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[40px] p-8 max-h-[80vh] overflow-y-auto">
          <div className="flex h-full">
            <div className="flex-1">
              <ProducerDetails
                producer={selectedProducer}
                producers={producers}
                onProducerChange={handleProducerChange}
              />
            </div>

            <div className="w-96 border-l border-gray-200">
              <ProductPanel producer={selectedProducer} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
