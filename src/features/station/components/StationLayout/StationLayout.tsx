"use client";

import { useState } from "react";
import { Station } from "@/shared/types";
import { Producer } from "../../types";
import { useTranslation } from "react-i18next";
import LanguageToggle from "@/shared/components/LanguageToggle/LanguageToggle";
import RegionMap from "../RegionMap/RegionMap";

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

  const handleProducerSelect = (producer: Producer | null, index: number) => {
    setSelectedProducer(producer);
    setCurrentProducerIndex(index);
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
    </div>
  );
}
